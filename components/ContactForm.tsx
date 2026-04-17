"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <p className="eyebrow">— Formulaire</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Votre nom" placeholder="Jeanne Dupont" required />
        <Field
          id="email"
          type="email"
          label="Email"
          placeholder="jeanne@entreprise.fr"
          required
        />
      </div>

      <Field
        id="company"
        label="Entreprise / contexte"
        placeholder="Startup, agence, solo, etc."
      />

      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)]">
          Type de projet
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Design system",
            "Application web",
            "Site vitrine",
            "Audit / conseil",
            "Autre",
          ].map((t) => (
            <label
              key={t}
              className="cursor-pointer rounded-full border border-[color:var(--line-strong)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)] transition-colors has-[:checked]:border-[color:var(--ember)] has-[:checked]:bg-[color:var(--ember-glow)] has-[:checked]:text-[color:var(--ember)]"
            >
              <input type="radio" name="type" value={t} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)]"
        >
          Dites-m'en plus
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Le contexte, la deadline approximative, ce qui vous bloque aujourd'hui…"
          className="mt-2 w-full resize-none border-b border-[color:var(--line-strong)] bg-transparent py-3 font-body text-lg text-[color:var(--ink)] placeholder:text-[color:var(--ink-dim)] focus:border-[color:var(--ember)] focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-4">
        <button
          type="submit"
          disabled={status !== "idle"}
          className="btn-primary disabled:opacity-50"
        >
          {status === "sending"
            ? "✦ Envoi…"
            : status === "sent"
              ? "✓ Reçu, merci"
              : "✦ Envoyer"}
        </button>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
          Ou direct par email — hello@alexdupont.dev
        </p>
      </div>

      {status === "sent" && (
        <p className="italic-serif text-xl text-[color:var(--ember)]">
          Message reçu. Je reviens vers vous sous 48h.
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)]"
      >
        {label}
        {required && <span className="ml-1 text-[color:var(--ember)]">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-[color:var(--line-strong)] bg-transparent py-3 font-body text-lg text-[color:var(--ink)] placeholder:text-[color:var(--ink-dim)] focus:border-[color:var(--ember)] focus:outline-none"
      />
    </div>
  );
}
