"use client";

import { useEffect, useRef, useState } from "react";

/**
 * KineticForm — a form where the submit button and each field wrapper
 * exhibit magnetic attraction to the cursor. Physics is a critically-
 * damped spring (stiffness 320, damping 26) driven by a single rAF.
 *
 * Why refs, not state: state-driven animation re-renders the tree each
 * frame and fights the compositor. We bypass React entirely and write
 * transform strings straight to the DOM — zero reconcile, 60 fps easy.
 */

type Spring = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
};

const STIFFNESS = 320;
const DAMPING = 26;

/** Pull factor: how far (in px) the element follows the cursor. */
const MAGNET_STRENGTH = 22;
/** Radius (in px) beyond which the cursor has zero pull. */
const MAGNET_RADIUS = 180;

type FieldState = "idle" | "typing";

export default function KineticForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonSpring = useRef<Spring>({
    x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
  });
  const labelRef = useRef<HTMLSpanElement>(null);
  const labelSpring = useRef<Spring>({
    x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focusField, setFocusField] = useState<string | null>(null);

  // ── Global pointer → per-element magnetic target
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const btn = buttonRef.current;
      if (btn) {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const falloff = Math.max(0, 1 - dist / MAGNET_RADIUS);
        // Smoothstep for a softer approach — linear feels robotic
        const s = falloff * falloff * (3 - 2 * falloff);
        buttonSpring.current.tx = (dx / Math.max(dist, 1)) * s * MAGNET_STRENGTH;
        buttonSpring.current.ty = (dy / Math.max(dist, 1)) * s * MAGNET_STRENGTH;

        // Inner label follows 55% for a parallax split
        labelSpring.current.tx = buttonSpring.current.tx * 0.55;
        labelSpring.current.ty = buttonSpring.current.ty * 0.55;
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // ── Single rAF loop — stiff spring integration for button + label
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const integrate = (s: Spring) => {
        // Critically damped spring: ẍ = k(t - x) - c·ẋ
        const ax = STIFFNESS * (s.tx - s.x) - DAMPING * s.vx;
        const ay = STIFFNESS * (s.ty - s.y) - DAMPING * s.vy;
        s.vx += ax * dt;
        s.vy += ay * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
      };

      integrate(buttonSpring.current);
      integrate(labelSpring.current);

      if (buttonRef.current) {
        const { x, y } = buttonSpring.current;
        buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (labelRef.current) {
        const { x, y } = labelSpring.current;
        labelRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // Simulated — real implementation would POST to an API route
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("sent");
    formRef.current?.reset();
    setTimeout(() => setStatus("idle"), 2600);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid gap-6"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Nom"
          placeholder="Marie Dubois"
          focusField={focusField}
          setFocusField={setFocusField}
        />
        <Field
          name="company"
          label="Entreprise"
          placeholder="CGR International"
          focusField={focusField}
          setFocusField={setFocusField}
        />
      </div>

      <Field
        name="email"
        type="email"
        label="Email"
        placeholder="marie@exemple.fr"
        focusField={focusField}
        setFocusField={setFocusField}
      />

      <Field
        name="message"
        as="textarea"
        label="Projet"
        placeholder="Quelques mots — volume estimé, secteur, jalons clés…"
        focusField={focusField}
        setFocusField={setFocusField}
      />

      <div className="mt-2 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
          {status === "sent"
            ? "● Message transmis — réponse sous 48h"
            : status === "sending"
            ? "● Transmission en cours…"
            : "● Chiffré en transit · GDPR-ready"}
        </p>

        <button
          ref={buttonRef}
          type="submit"
          disabled={status !== "idle"}
          className="group relative inline-flex select-none items-center overflow-hidden rounded-full bg-ignition px-8 py-4 font-mono text-xs uppercase tracking-widest text-carbon-950 transition-colors will-change-transform disabled:opacity-70"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[110%]"
          />
          <span
            ref={labelRef}
            className="relative flex items-center gap-3 will-change-transform"
          >
            {status === "sent"
              ? "✓ Envoyé"
              : status === "sending"
              ? "→ Envoi…"
              : "✦ Envoyer la demande"}
          </span>
        </button>
      </div>
    </form>
  );
}

// ──────────────────────────────────────────────────────────────
// Field — animated label + ignition-orange underline on focus
// ──────────────────────────────────────────────────────────────
function Field({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  focusField,
  setFocusField,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  as?: "input" | "textarea";
  focusField: string | null;
  setFocusField: (f: string | null) => void;
}) {
  const [value, setValue] = useState("");
  const active = focusField === name || value.length > 0;

  const commonProps = {
    id: name,
    name,
    value,
    placeholder: active ? placeholder : " ",
    onFocus: () => setFocusField(name),
    onBlur: () => setFocusField(null),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    className:
      "peer w-full bg-transparent px-0 pt-6 pb-3 font-display text-lg text-steel-100 outline-none placeholder:text-steel-400/60",
  };

  return (
    <label htmlFor={name} className="group relative block">
      <span
        className={`absolute left-0 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
          active
            ? "top-0 text-[10px] text-ignition"
            : "top-[1.45rem] text-steel-400"
        }`}
      >
        {label}
      </span>

      {as === "textarea" ? (
        <textarea {...commonProps} rows={4} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {/* Base line */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full bg-[color:var(--line-strong)]"
      />
      {/* Focus line — scales from center */}
      <span
        aria-hidden
        className={`absolute bottom-0 left-0 h-px w-full origin-center bg-ignition transition-transform duration-500 ${
          focusField === name ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </label>
  );
}
