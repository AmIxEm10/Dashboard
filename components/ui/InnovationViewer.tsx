"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useState } from "react";
import MetalHelix from "@/components/three/MetalHelix";

/**
 * Innovation viewer — a self-contained <Canvas> so OrbitControls can
 * own pointer events inside the box without hijacking page scroll or
 * navbar clicks. The global scene canvas blanks out on this route
 * (see SceneCanvas.tsx, mode === "blank").
 */
export default function InnovationViewer() {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      className="relative aspect-square w-full overflow-hidden rounded-sm border border-[color:var(--line-strong)] bg-gradient-to-br from-paper-soft via-paper to-paper-elev shadow-brand-lg"
    >
      {/* Cursor hint */}
      <div
        className={`pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-paper/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-500 backdrop-blur transition-opacity ${
          hovering ? "opacity-40" : "opacity-100"
        }`}
      >
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
        Drag to inspect
      </div>

      {/* Scan-line gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(11,34,80,0.025) 0px, rgba(11,34,80,0.025) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Corner markers */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-l border-b",
        "right-3 bottom-3 border-r border-b",
      ].map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute z-10 h-3 w-3 border-accent/70 ${c}`}
        />
      ))}

      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [3.2, 1.4, 4.6], fov: 38 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[4, 5, 3]}
            intensity={1.4}
            color="#ffffff"
          />
          <directionalLight
            position={[-4, -2, -3]}
            intensity={0.5}
            color="#e6007e"
          />
          <pointLight position={[0, 0, 2]} intensity={0.8} color="#f65aa7" />

          <MetalHelix />

          <ContactShadows
            position={[0, -1.75, 0]}
            opacity={0.25}
            scale={6}
            blur={2.4}
            far={4}
            color="#0b2250"
          />
          <Environment preset="city" />

          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enableZoom
            enablePan={false}
            minDistance={3.2}
            maxDistance={8}
            autoRotate={!hovering}
            autoRotateSpeed={0.6}
          />

          <EffectComposer multisampling={0}>
            <Bloom
              mipmapBlur
              intensity={1.6}
              luminanceThreshold={0.55}
              luminanceSmoothing={0.25}
              radius={0.7}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
