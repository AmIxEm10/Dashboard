"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { Suspense, useMemo } from "react";
import Spring3D from "./Spring3D";
import ParticleForge from "./ParticleForge";

/**
 * Global background canvas. Lives in the root layout, so it is never
 * unmounted across client navigations — the WebGL context, env map and
 * instanced buffers are reused. Only the scene contents swap based on
 * the active route.
 */
export default function SceneCanvas() {
  const pathname = usePathname();

  const sceneMode: "hero" | "forge" = useMemo(() => {
    if (pathname?.startsWith("/industries")) return "forge";
    return "hero";
  }, [pathname]);

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

          {sceneMode === "hero" && <Spring3D />}
          {sceneMode === "forge" && <ParticleForge />}

          <Environment preset="warehouse" />

          {sceneMode === "hero" && (
            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.55}
              scale={6}
              blur={2.4}
              far={4}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
