import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#ede6db",
          muted: "#8a8278",
          dim: "#5c554d",
        },
        paper: "#0c0a09",
        surface: "#14110f",
        ember: {
          DEFAULT: "#f96e46",
          dim: "#c94f2b",
          glow: "rgba(249, 110, 70, 0.15)",
        },
        line: "rgba(237, 230, 219, 0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        italic: ["var(--font-italic)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        marquee: "marquee 40s linear infinite",
        flicker: "flicker 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
