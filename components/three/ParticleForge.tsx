"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "@/lib/motion-store";

/**
 * ParticleForge — GPU edition.
 *
 * The four target shapes (chaos / auto / aero / médical) are uploaded
 * once as InstancedBufferAttributes. The morphing, noise, rotation
 * and heat coloring all happen on the GPU via a ShaderMaterial.
 *
 * CPU work per frame: update 3 uniforms (industryFloat, morphSpeed,
 * time). That's it. The vertex shader does per-instance lerp between
 * two targets, adds organic noise, applies a per-particle rotation,
 * and forwards a "heat" value to the fragment shader. The fragment
 * shader mixes steel → ignition orange based on heat and boosts
 * brightness past 1.0 so the Bloom post-pass picks up the hot metal.
 *
 * Performance: a single draw call, zero JS allocations per frame,
 * and the heavy per-particle math moves from the main thread onto
 * the GPU's thousands of parallel lanes.
 */

const DEFAULT_COUNT = 2400;

// Brand-aligned colors for the GPU heat ramp.
// Cold = navy (CGR wordmark), hot = magenta (brand swoosh).
const ACCENT = new THREE.Color("#e6007e"); // magenta · hot end
const BRAND = new THREE.Color("#1c44a0"); // navy steel · cold end
const DEEP = new THREE.Color("#061433"); // deep navy · shadow core

// ── Deterministic PRNG (mulberry32) — stable identity across reloads
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

// ── Four analytical target shapes (same logic as the CPU version)
function buildTargets(count: number): Float32Array[] {
  const rand = mulberry32(42);
  const targets: Float32Array[] = [];

  // 0 · chaos sphere
  const chaos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rand(), v = rand();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(rand()) * 2.6;
    chaos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    chaos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    chaos[i * 3 + 2] = r * Math.cos(phi);
  }
  targets.push(chaos);

  // 1 · automobile — stretched stadium + 4 wheels
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

  // 2 · aéronautique — NACA airfoil, tapered
  const aero = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rand();
    const span = rand() - 0.5;
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

  // 3 · médical — double helix + rungs
  const med = new Float32Array(count * 3);
  const turns = 5;
  for (let i = 0; i < count; i++) {
    const t = rand();
    if (i % 11 === 0) {
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

// ── Vertex shader
const vertexShader = /* glsl */ `
precision highp float;

attribute vec3 iChaos;
attribute vec3 iAuto;
attribute vec3 iAero;
attribute vec3 iMed;
attribute float iOffset;

uniform float uIndustry;   // 0..3
uniform float uMorphSpeed; // d(industry)/dt, smoothed on CPU
uniform float uTime;

varying float vHeat;
varying vec3  vNormal;
varying vec3  vViewDir;

vec3 pickTarget(int i) {
  if (i == 0) return iChaos;
  if (i == 1) return iAuto;
  if (i == 2) return iAero;
  return iMed;
}

void main() {
  float ind = clamp(uIndustry, 0.0, 3.0);
  int   lo  = int(floor(ind));
  int   hi  = min(lo + 1, 3);
  float frac = ind - float(lo);

  vec3 tLo = pickTarget(lo);
  vec3 tHi = pickTarget(hi);
  vec3 target = mix(tLo, tHi, frac);

  // Organic noise — peaks at mid-morph (frac = 0.5), vanishes at rest
  float mid = 1.0 - abs(frac - 0.5) * 2.0;
  float noiseAmp = 0.18 * mid;
  vec3 noise = vec3(
    sin(target.x * 1.3 + iOffset + uTime * 0.4),
    sin(target.y * 1.1 + iOffset + uTime * 0.3),
    sin(target.z * 1.5 + iOffset + uTime * 0.35)
  ) * noiseAmp;
  target += noise;

  // Per-particle Y-rotation so each cylinder reads as an oriented wire
  float angle = uTime * 0.35 + iOffset;
  float c = cos(angle);
  float s = sin(angle);
  mat3 rot = mat3(
    c,   0.0, s,
    0.0, 1.0, 0.0,
    -s,  0.0, c
  );

  float scale = 0.045 + (sin(uTime * 0.6 + iOffset) * 0.5 + 0.5) * 0.02;
  vec3 localPos = rot * position * scale;
  vec3 worldPos = target + localPos;

  gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);

  // Per-particle velocity estimate:
  // targetDelta = how much this instance moves per unit of industry
  // uMorphSpeed = how fast industry is changing right now
  // → visible only where the transition actually displaces the particle
  float targetDelta = length(tHi - tLo);
  float velocity    = targetDelta * uMorphSpeed;

  // Mid-transition adds a "forming" glow even at low speed
  vHeat = clamp(velocity * 0.55 + mid * 0.35, 0.0, 1.0);

  vNormal  = normalize(rot * normal);
  vViewDir = normalize(cameraPosition - worldPos);
}
`;

// ── Fragment shader
const fragmentShader = /* glsl */ `
precision highp float;

varying float vHeat;
varying vec3  vNormal;
varying vec3  vViewDir;

uniform vec3 uColorCold;   // steel
uniform vec3 uColorCarbon; // near-black shadow
uniform vec3 uColorHot;    // ignition orange

void main() {
  // Cheap lighting: fresnel rim + N·V for soft shading
  float nv   = max(dot(vNormal, vViewDir), 0.0);
  float fres = pow(1.0 - nv, 2.2);

  // Temperature blend — heat goes steel → orange
  vec3 base = mix(uColorCold, uColorHot, vHeat);

  // Darker carbon core where the particle faces away from the camera
  vec3 shaded = mix(uColorCarbon, base, nv * 0.85 + 0.15);

  // Rim highlight
  vec3 color = shaded + fres * 0.35;

  // Hot particles overshoot 1.0 → Bloom post-pass catches them
  color += uColorHot * vHeat * vHeat * 1.6;

  gl_FragColor = vec4(color, 1.0);
}
`;

type Props = {
  /**
   * Particle count. Downstream (SceneCanvas) passes a reduced value on
   * mobile — the geometry rebuilds only when this changes, never per
   * frame, so there is zero cost to switching budgets.
   */
  count?: number;
};

export default function ParticleForge({ count = DEFAULT_COUNT }: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const prevIndustry = useRef(0);

  // ── Targets + random offsets — baked once per `count` change
  const { geometry, uniforms } = useMemo(() => {
    const targets = buildTargets(count);
    const offsets = new Float32Array(count);
    const orand = mulberry32(1337);
    for (let i = 0; i < count; i++) offsets[i] = orand() * 100;

    // Base cylinder (shared across all instances)
    const base = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 8);

    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.setAttribute("position", base.attributes.position);
    geo.setAttribute("normal", base.attributes.normal);
    geo.setAttribute("uv", base.attributes.uv);
    geo.setAttribute(
      "iChaos",
      new THREE.InstancedBufferAttribute(targets[0], 3),
    );
    geo.setAttribute(
      "iAuto",
      new THREE.InstancedBufferAttribute(targets[1], 3),
    );
    geo.setAttribute(
      "iAero",
      new THREE.InstancedBufferAttribute(targets[2], 3),
    );
    geo.setAttribute(
      "iMed",
      new THREE.InstancedBufferAttribute(targets[3], 3),
    );
    geo.setAttribute(
      "iOffset",
      new THREE.InstancedBufferAttribute(offsets, 1),
    );
    geo.instanceCount = count;
    // Large bounding sphere so the mesh never gets frustum-culled
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);

    const uniforms = {
      uIndustry:    { value: 0 },
      uMorphSpeed:  { value: 0 },
      uTime:        { value: 0 },
      uColorCold:   { value: BRAND },
      uColorCarbon: { value: DEEP },
      uColorHot:    { value: ACCENT },
    };

    return { geometry: geo, uniforms };
  }, [count]);

  useFrame((state, delta) => {
    const mat = material.current;
    if (!mat) return;

    const dt  = Math.max(0.001, Math.min(delta, 0.05));
    const cur = motion.industryFloat;

    // Instantaneous morph speed, smoothed so brief stalls don't flash
    const rawSpeed = Math.abs(cur - prevIndustry.current) / dt;
    const smoothed = THREE.MathUtils.damp(
      uniforms.uMorphSpeed.value,
      rawSpeed,
      6,
      dt,
    );

    uniforms.uIndustry.value   = cur;
    uniforms.uMorphSpeed.value = smoothed;
    uniforms.uTime.value       = state.clock.elapsedTime;

    prevIndustry.current = cur;
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
      />
    </mesh>
  );
}
