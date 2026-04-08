import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#cc97ff",
          foreground: "#000000",
        },
        surface: {
          DEFAULT: "#000000",
          low: "#0e0e0e",
          lowest: "#080808",
        },
        onSurface: {
          DEFAULT: "#ffffff",
          variant: "#a0a0a0",
        },
        outline: {
          DEFAULT: "#1a1a1a",
          variant: "#2a2a2a",
        }
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #cc97ff 0%, #7000ff 100%)",
        "dark-gradient": "linear-gradient(to bottom, #000000 0%, #0e0e0e 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
