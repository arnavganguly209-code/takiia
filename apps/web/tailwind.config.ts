import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        mist: "#F7FAFF",
        ink: "#1B2940",
        navy: "#14264A",
        muted: "#66758B",
        line: "#E5ECF5",
        pale: "#EDF5FF",
        mintsoft: "#E9FFF6",
        brand: {
          500: "#2563EB",
          600: "#1D4ED8"
        },
        cyan: {
          400: "#22C7E8"
        },
        mint: {
          400: "#67E8C5"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glass: "0 18px 50px rgba(23, 59, 112, 0.08)",
        soft: "0 10px 30px rgba(23, 59, 112, 0.06)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at 18% 12%, rgba(34,199,232,0.16), transparent 34%), radial-gradient(circle at 88% 8%, rgba(103,232,197,0.16), transparent 32%), linear-gradient(180deg, #FFFFFF 0%, #F6FAFF 100%)"
      }
    }
  },
  plugins: []
};

export default config;
