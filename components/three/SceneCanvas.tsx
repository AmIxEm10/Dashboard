"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import Spring3D from "./Spring3D";

/**
 * Global background canvas. Fixed behind the DOM, pointer-events: none
 * so the page stays fully interactive. DPR capped at 1.5 to keep perf
 * on high-density displays.
 */
export default function SceneCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[4, 6, 3]}
            intensity={1.2}
            color="#ffffff"
          />
          <directionalLight
            position={[-5, -2, -2]}
            intensity={0.4}
            color="#ff4d1f"
          />
          <pointLight position={[0, 0, 3]} intensity={0.6} color="#ff7040" />

          <Spring3D />

          <Environment preset="warehouse" />

          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.55}
            scale={6}
            blur={2.4}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
