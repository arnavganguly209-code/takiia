import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          950: "#0c120f",
          900: "#121a16",
          800: "#1b2720",
          700: "#2a3b31"
        },
        parchment: {
          50: "#f7f1e4",
          100: "#efe4cf",
          200: "#e2d0ae"
        },
        copper: {
          400: "#e08a4d",
          500: "#c46a2b",
          600: "#9e4f1c"
        },
        brass: {
          300: "#e6c37a",
          400: "#d4a04a"
        },
        fern: {
          400: "#8eae79",
          500: "#6d8b58"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        insetcard: "inset 0 1px 0 rgba(247,241,228,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
