"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "@/lib/motion-store";

/**
 * ParticleForge
 * -------------
 * A single InstancedMesh of COUNT metallic wire-cylinders that morph
 * between pre-computed target shapes (chaos → automobile → airfoil →
 * double helix) based on `motion.industryFloat` (fractional index).
 *
 * Perf contract:
 *  - One draw call for the whole cloud (InstancedMesh).
 *  - Zero React state per frame — we read `motion.industryFloat` from
 *    the shared motion store (plain object).
 *  - Zero allocations in the hot loop: one shared Object3D dummy, one
 *    Float32Array for current positions. Damping lerp factor is
 *    pre-computed once per frame outside the per-instance loop.
 *  - Target positions are baked once in useMemo via deterministic PRNG
 *    so particle "identity" is stable across HMR reloads.
 */

const COUNT = 2400;

// ── Shared scratch objects (module-scoped, safe because useFrame is serial)
const dummy = new THREE.Object3D();

// ── Deterministic PRNG so target shapes stay identical across reloads
function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Cheap "noise" — sum of phase-shifted sines. Not real simplex, but
//    smooth, continuous, and 4× cheaper than a proper noise lib.
function noise3(x: number, y: number, z: number) {
  return (
    Math.sin(x * 1.3 + y * 0.7) * 0.5 +
    Math.sin(y * 1.1 + z * 1.7) * 0.3 +
    Math.sin(z * 0.9 + x * 1.5) * 0.2
  );
}

// ── Build the four target Float32Arrays (each length COUNT*3)
function buildTargets(count: number): Float32Array[] {
  const rand = mulberry32(42);
  const targets: Float32Array[] = [];

  // 0 · CHAOS — uniform sphere cloud, slightly squashed on Y
  const chaos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rand();
    const v = rand();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(rand()) * 2.6;
    chaos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    chaos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    chaos[i * 3 + 2] = r * Math.cos(phi);
  }
  targets.push(chaos);

  // 1 · AUTOMOBILE — abstract car silhouette: stretched stadium body +
  //    four radial wheel clusters. Reads as a car at a glance, stays
  //    geometric enough to feel industrial.
  const auto = new Float32Array(count * 3);
  const bodyCount = Math.floor(count * 0.8);
  for (let i = 0; i < bodyCount; i++) {
    const t = rand();
    const x = (t - 0.5) * 4.0;
    const roof = Math.max(0, Math.sin(t * Math.PI) * 0.55);
    const y = (rand() - 0.5) * (0.35 + roof) - 0.15;
    const z = (rand() - 0.5) * 1.15;
    auto[i * 3] = x;
    auto[i * 3 + 1] = y;
    auto[i * 3 + 2] = z;
  }
  const wheels: [number, number, number][] = [
    [-1.35, -0.55, 0.55],
    [1.35, -0.55, 0.55],
    [-1.35, -0.55, -0.55],
    [1.35, -0.55, -0.55],
  ];
  const perWheel = Math.floor((count - bodyCount) / 4);
  for (let w = 0; w < 4; w++) {
    const start = bodyCount + w * perWheel;
    for (let i = start; i < start + perWheel && i < count; i++) {
      const ang = rand() * Math.PI * 2;
      const r = 0.38 * Math.sqrt(rand());
      auto[i * 3] = wheels[w][0] + Math.cos(ang) * r;
      auto[i * 3 + 1] = wheels[w][1] + Math.sin(ang) * r;
      auto[i * 3 + 2] = wheels[w][2] + (rand() - 0.5) * 0.18;
    }
  }
  targets.push(auto);

  // 2 · AÉRONAUTIQUE — airfoil wing (NACA-ish thickness distribution,
  //    tapered at the tip). Particles populate the upper + lower skin.
  const aero = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rand(); // chord position 0..1
    const span = rand() - 0.5; // -0.5..0.5
    const thick =
      0.75 *
      (0.2969 * Math.sqrt(u) -
        0.126 * u -
        0.3516 * u * u +
        0.2843 * u * u * u -
        0.1015 * u * u * u * u);
    const side = rand() > 0.5 ? 1 : -1;
    const taper = 1 - Math.abs(span) * 0.4;
    aero[i * 3] = (u - 0.4) * 3.6 * taper;
    aero[i * 3 + 1] = side * thick * 1.8;
    aero[i * 3 + 2] = span * 4.5;
  }
  targets.push(aero);

  // 3 · MÉDICAL — double helix (DNA). 2 strands + occasional rungs for
  //    the familiar ladder silhouette.
  const med = new Float32Array(count * 3);
  const turns = 5;
  for (let i = 0; i < count; i++) {
    const t = rand();
    if (i % 11 === 0) {
      // rung particle crossing both strands at height y
      const y = (t - 0.5) * 3.8;
      const angle = (y / 3.8) * Math.PI * 2 * turns;
      const k = rand() * 2 - 1;
      med[i * 3] = Math.cos(angle) * 0.9 * k;
      med[i * 3 + 1] = y;
      med[i * 3 + 2] = Math.sin(angle) * 0.9 * k;
    } else {
      const strand = i % 2;
      const angle = t * Math.PI * 2 * turns + strand * Math.PI;
      med[i * 3] = Math.cos(angle) * 0.95;
      med[i * 3 + 1] = (t - 0.5) * 3.8;
      med[i * 3 + 2] = Math.sin(angle) * 0.95;
    }
  }
  targets.push(med);

  return targets;
}

export default function ParticleForge() {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const targets = useMemo(() => buildTargets(COUNT), []);
  const currents = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    arr.set(targets[0]); // start in chaos
    return arr;
  }, [targets]);

  // Per-particle random offsets for organic, desynchronized drift
  const offsets = useMemo(() => {
    const rand = mulberry32(1337);
    const arr = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) arr[i] = rand() * 100;
    return arr;
  }, []);

  // Mark the matrix buffer as dynamically updated — tells the GPU driver
  // to optimize for per-frame rewrites.
  useEffect(() => {
    if (mesh.current) {
      mesh.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    }
  }, []);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;

    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05); // cap to avoid jumps on tab refocus

    // --- Morph state: lerp between targets[lo] and targets[hi] ---
    const raw = motion.industryFloat;
    const wrapped = ((raw % targets.length) + targets.length) % targets.length;
    const lo = Math.floor(wrapped);
    const hi = (lo + 1) % targets.length;
    const frac = wrapped - lo;

    // Noise peaks at mid-transition (frac = 0.5), fades to 0 at settled
    const noiseAmp = 0.18 * (1 - Math.abs(frac - 0.5) * 2);

    // Single exponential-damping coefficient computed once per frame
    const lambda = 3.2;
    const lerpAmt = 1 - Math.exp(-lambda * dt);

    const A = targets[lo];
    const B = targets[hi];
    const C = currents;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // Cross-target position (straight lerp in flat buffers, no alloc)
      const tx = A[i3] * (1 - frac) + B[i3] * frac;
      const ty = A[i3 + 1] * (1 - frac) + B[i3 + 1] * frac;
      const tz = A[i3 + 2] * (1 - frac) + B[i3 + 2] * frac;

      // Organic turbulence during transition
      const off = offsets[i];
      const nx = noise3(tx * 0.5 + off, t * 0.4, tz) * noiseAmp;
      const ny = noise3(ty + off, t * 0.3, tx) * noiseAmp;
      const nz = noise3(tz * 0.5 + off, t * 0.35, ty) * noiseAmp;

      // Critically-damped approach to the (target + noise) position
      C[i3] += (tx + nx - C[i3]) * lerpAmt;
      C[i3 + 1] += (ty + ny - C[i3 + 1]) * lerpAmt;
      C[i3 + 2] += (tz + nz - C[i3 + 2]) * lerpAmt;

      // Write instance matrix via shared dummy
      dummy.position.set(C[i3], C[i3 + 1], C[i3 + 2]);
      // Slight per-particle spin — reads as oriented "wire" segments
      dummy.rotation.set(t * 0.35 + off, t * 0.22 + off * 0.7, 0);
      const s = 0.045 + (Math.sin(t * 0.6 + off) * 0.5 + 0.5) * 0.02;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }

    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, COUNT]}
      frustumCulled={false}
    >
      {/* Thin cylinder reads as a wire segment. 8 sides = ~38k tris
          for 2400 instances, well under any GPU budget. */}
      <cylinderGeometry args={[0.5, 0.5, 2.2, 8]} />
      <meshStandardMaterial
        color="#c8ced6"
        metalness={0.95}
        roughness={0.22}
        emissive="#ff4d1f"
        emissiveIntensity={0.12}
      />
    </instancedMesh>
  );
}
