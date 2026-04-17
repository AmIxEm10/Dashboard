"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored =
      (document.documentElement.getAttribute("data-theme") as "dark" | "light") ||
      "dark";
    setTheme(stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Passer en mode ${theme === "dark" ? "clair" : "sombre"}`}
      className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line-strong)] text-[color:var(--ink-muted)] transition-colors hover:bg-[color:var(--bg-elev)] hover:text-[color:var(--ink)]"
    >
      <span className="font-mono text-[10px]">
        {mounted ? (theme === "dark" ? "☾" : "☀") : "·"}
      </span>
    </button>
  );
}
