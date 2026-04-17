"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "@/lib/motion-store";

/**
 * Parametric helix curve used as the spring's centerline.
 * We rebuild it only when topology changes (turns/radius/height). The
 * per-frame deformation happens via group.scale.y — no geometry allocs
 * in the render loop.
 */
class HelixCurve extends THREE.Curve<THREE.Vector3> {
  turns: number;
  radius: number;
  height: number;

  constructor(turns = 9, radius = 0.65, height = 3.2) {
    super();
    this.turns = turns;
    this.radius = radius;
    this.height = height;
  }

  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * this.turns;
    const y = (t - 0.5) * this.height;
    return target.set(
      Math.cos(angle) * this.radius,
      y,
      Math.sin(angle) * this.radius,
    );
  }
}

type Props = {
  turns?: number;
  radius?: number;
  height?: number;
  tubeRadius?: number;
};

export default function Spring3D({
  turns = 9,
  radius = 0.65,
  height = 3.2,
  tubeRadius = 0.055,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const curve = new HelixCurve(turns, radius, height);
    // tubularSegments = turns * 40 → smooth helix without blowing geometry
    return new THREE.TubeGeometry(curve, turns * 40, tubeRadius, 16, false);
  }, [turns, radius, height, tubeRadius]);

  // Damping targets (lerped each frame) — kept in local refs to avoid
  // re-renders. Compression/rotation follow the spring equation feel.
  const target = useRef({
    scaleY: 1,
    rotX: 0,
    rotY: 0,
    tilt: 0,
  });

  useFrame((_, delta) => {
    if (!group.current || !mesh.current) return;

    // 1. Compression from scroll (1 → 0.35 across 1 viewport)
    const compression = 1 - motion.scrollProgress * 0.65;
    // 2. Mouse-driven tilt (subtle, constrained)
    const tiltX = motion.mouseY * 0.35;
    const tiltY = motion.mouseX * 0.6;
    // 3. Idle rotation — slow, always alive
    target.current.rotY += delta * 0.15;

    // Critical damping: THREE.MathUtils.damp(current, target, lambda, dt)
    const g = group.current;
    g.scale.y = THREE.MathUtils.damp(g.scale.y, compression, 6, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tiltX, 5, delta);
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      target.current.rotY + tiltY,
      5,
      delta,
    );

    // Micro "breathing" on the tube radius via material emissive — adds
    // a sense of latent tension without allocating anything.
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.0015);
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.25 + pulse * 0.35 * motion.scrollProgress;
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#0b2250"
          metalness={0.92}
          roughness={0.22}
          emissive="#e6007e"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Anchor plates at each end — adds scale and industrial feel */}
      <mesh position={[0, height / 2 + 0.04, 0]}>
        <cylinderGeometry args={[radius + 0.18, radius + 0.18, 0.06, 48]} />
        <meshStandardMaterial color="#061433" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, -height / 2 - 0.04, 0]}>
        <cylinderGeometry args={[radius + 0.18, radius + 0.18, 0.06, 48]} />
        <meshStandardMaterial color="#061433" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}
