import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Oracle palette pulled from the Foreseen logo: deep void, mystic
        // purple, scrying cyan, prophetic gold.
        void: "#0a0a14",
        panel: "#12121f",
        oracle: {
          purple: "#7c5cff",
          cyan: "#37e6ff",
          gold: "#f5c451",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 30px -5px rgba(124, 92, 255, 0.45)",
        "glow-lg": "0 0 80px -10px rgba(124, 92, 255, 0.55)",
        "glow-cyan": "0 0 30px -5px rgba(55, 230, 255, 0.35)",
        "glow-gold": "0 0 30px -5px rgba(245, 196, 81, 0.35)",
        "glow-sm": "0 0 15px -5px rgba(124, 92, 255, 0.35)",
        "glow-emerald": "0 0 30px -5px rgba(52, 211, 153, 0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceSm: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glowPulse: "glowPulse 5s ease-in-out infinite",
        spinSlow: "spinSlow 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        fadeIn: "fadeIn 0.4s ease-out both",
        bounceSm: "bounceSm 1.2s ease-in-out infinite",
        slideUp: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        slideDown: "slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
