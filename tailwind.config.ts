import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#070709",
          900: "#0b0c0f",
          800: "#111318",
          700: "#1a1d24",
          600: "#262a33",
        },
        steel: {
          400: "#8a919c",
          300: "#a6adb8",
          200: "#c8ced6",
          100: "#e4e7ec",
        },
        ignition: {
          DEFAULT: "#ff4d1f",
          500: "#ff4d1f",
          400: "#ff7040",
          600: "#d93b12",
          glow: "rgba(255, 77, 31, 0.35)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest: "0.22em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scan": "scan 6s linear infinite",
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
