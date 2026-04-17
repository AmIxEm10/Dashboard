"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { usePathname } from "next/navigation";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Vector2 } from "three";
import { motion } from "@/lib/motion-store";
import { useIsMobile } from "@/lib/useIsMobile";
import Spring3D from "./Spring3D";
import ParticleForge from "./ParticleForge";

/**
 * Kinetic chromatic aberration — RGB offset breathes with the user's
 * scroll velocity. Fast flings distort reality, a still page is
 * pristine. Single full-screen pass inside EffectComposer.
 */
function KineticAberration() {
  const ref = useRef<any>(null);
  const v = useMemo(() => new Vector2(0, 0), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = motion.scrollVelocity * 0.004;
    v.x = THREE.MathUtils.damp(v.x, target, 10, delta);
    v.y = THREE.MathUtils.damp(v.y, target * 0.6, 10, delta);
    ref.current.offset = v;
  });

  return (
    <ChromaticAberration
      ref={ref}
      blendFunction={BlendFunction.NORMAL}
      offset={v}
      radialModulation={false}
      modulationOffset={0}
    />
  );
}

type SceneMode = "hero" | "forge" | "blank";

/**
 * Global background canvas — persistent across client navigations.
 * On /innovation the global canvas blanks out and the page mounts
 * its own local canvas so OrbitControls can capture drag gestures
 * without conflicting with page scroll / navbar clicks.
 */
export default function SceneCanvas() {
  const pathname = usePathname();
  const isMobile = useIsMobile(768);

  const mode: SceneMode = useMemo(() => {
    if (pathname?.startsWith("/industries")) return "forge";
    if (pathname?.startsWith("/innovation")) return "blank";
    if (pathname?.startsWith("/contact")) return "blank";
    return "hero";
  }, [pathname]);

  // Mobile budget: single-pixel DPR, lighter bloom, no chromatic
  // aberration or vignette. Keeps the scene recognizable while
  // trimming ~40% of fragment-shader cost on a typical handset.
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5];
  const particleCount = isMobile ? 800 : 2400;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: mode === "blank" ? 0 : 1, transition: "opacity 0.6s" }}
    >
      <Canvas
        dpr={dpr}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
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

          {mode === "hero" && <Spring3D />}
          {mode === "forge" && <ParticleForge count={particleCount} />}

          <Environment preset="warehouse" />

          {mode === "hero" && !isMobile && (
            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.55}
              scale={6}
              blur={2.4}
              far={4}
            />
          )}

          {/* Post-processing — full stack on desktop, a trimmed Bloom
              only on mobile (no chromatic pass, no vignette, no
              mipmap blur) so the hot particles still glow without
              blowing the fragment-shader budget of a phone. */}
          {isMobile ? (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.7}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.25}
                radius={0.5}
              />
            </EffectComposer>
          ) : (
            <EffectComposer multisampling={0}>
              <Bloom
                mipmapBlur
                intensity={1.2}
                luminanceThreshold={0.85}
                luminanceSmoothing={0.2}
                radius={0.75}
              />
              <KineticAberration />
              <Vignette eskil={false} offset={0.2} darkness={0.6} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
