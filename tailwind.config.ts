import type { Config } from "tailwindcss";

/**
 * CGR International — Brand tokens
 *
 * Navy primary (#0B2250) from the "CGR" wordmark, magenta accent
 * (#E6007E) from the brand swoosh, paper-white surfaces. Tokens are
 * organized in three semantic families:
 *   - paper-*  → surfaces (lighter = less elevated)
 *   - ink-*    → text / primary navy
 *   - brand-*  → navy scale
 *   - accent-* → magenta scale (CTAs, highlights, heat)
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#ffffff",
          0: "#ffffff",
          soft: "#f5f7fa",
          elev: "#e9edf3",
          line: "#dfe4ed",
        },
        ink: {
          DEFAULT: "#0a1330",
          900: "#0a1330",
          700: "#1d2a55",
          500: "#4a5578",
          400: "#6b7594",
          300: "#8a94ad",
          200: "#b7bed0",
        },
        brand: {
          DEFAULT: "#0b2250",
          950: "#061433",
          900: "#0b2250",
          800: "#13357a",
          700: "#1c44a0",
          600: "#2a56bf",
          500: "#3f6ed6",
          400: "#7b92d3",
          300: "#b3c2e6",
        },
        accent: {
          DEFAULT: "#e6007e",
          700: "#a80059",
          600: "#c00068",
          500: "#e6007e",
          400: "#f65aa7",
          300: "#fba8cc",
          glow: "rgba(230, 0, 126, 0.32)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest: "0.22em",
      },
      boxShadow: {
        "brand-sm": "0 1px 2px 0 rgba(11, 34, 80, 0.06)",
        "brand-md":
          "0 4px 12px -2px rgba(11, 34, 80, 0.10), 0 2px 4px -2px rgba(11, 34, 80, 0.08)",
        "brand-lg":
          "0 18px 40px -12px rgba(11, 34, 80, 0.18), 0 8px 16px -8px rgba(11, 34, 80, 0.10)",
        accent:
          "0 12px 32px -8px rgba(230, 0, 126, 0.32), 0 4px 10px -4px rgba(230, 0, 126, 0.20)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        scan: "scan 6s linear infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
