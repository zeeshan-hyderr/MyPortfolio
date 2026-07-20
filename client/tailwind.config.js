/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0A0E17",
          surface: "#131826",
          border: "#1F2937",
        },
        accent: {
          cyan: "#38BDF8",
          violet: "#A78BFA",
        },
        ink: {
          DEFAULT: "#E5E7EB",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(56, 189, 248, 0.35)",
      },
    },
  },
  plugins: [],
};
