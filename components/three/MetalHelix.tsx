"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * MetalHelix — the "innovation" showcase piece.
 *
 * A double-helix of polished steel tubes with two end caps and a
 * central ignition-orange thread. Meant to be inspected freely by
 * the user (orbit controls live on the page).
 */
class HelixCurve extends THREE.Curve<THREE.Vector3> {
  turns: number;
  radius: number;
  height: number;
  phase: number;

  constructor(turns: number, radius: number, height: number, phase = 0) {
    super();
    this.turns = turns;
    this.radius = radius;
    this.height = height;
    this.phase = phase;
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * this.turns + this.phase;
    const y = (t - 0.5) * this.height;
    return target.set(
      Math.cos(angle) * this.radius,
      y,
      Math.sin(angle) * this.radius,
    );
  }
}

export default function MetalHelix() {
  const group = useRef<THREE.Group>(null);

  const { strandA, strandB, core } = useMemo(() => {
    const a = new THREE.TubeGeometry(
      new HelixCurve(6, 0.85, 3.2, 0),
      6 * 50,
      0.06,
      16,
      false,
    );
    const b = new THREE.TubeGeometry(
      new HelixCurve(6, 0.85, 3.2, Math.PI),
      6 * 50,
      0.06,
      16,
      false,
    );
    const c = new THREE.CylinderGeometry(0.015, 0.015, 3.2, 8);
    return { strandA: a, strandB: b, core: c };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    // Gentle idle rotation — OrbitControls override user-driven frames
    group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      <mesh geometry={strandA}>
        <meshStandardMaterial
          color="#c8ced6"
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>
      <mesh geometry={strandB}>
        <meshStandardMaterial
          color="#8a919c"
          metalness={0.9}
          roughness={0.28}
        />
      </mesh>
      <mesh geometry={core}>
        <meshStandardMaterial
          color="#ff4d1f"
          emissive="#ff4d1f"
          emissiveIntensity={1.6}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>

      {/* End caps */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[0, s * 1.65, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.08, 64]} />
          <meshStandardMaterial
            color="#1a1d24"
            metalness={0.9}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Rungs — subtle rings to reinforce the helix reading */}
      {Array.from({ length: 7 }).map((_, i) => {
        const t = i / 6;
        const y = (t - 0.5) * 3.0;
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.86, 0.008, 8, 48]} />
            <meshStandardMaterial
              color="#8a919c"
              metalness={0.9}
              roughness={0.35}
            />
          </mesh>
        );
      })}
    </group>
  );
}
