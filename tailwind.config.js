/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        iitm: {
          DEFAULT: "#185FA5",
          50: "#e9f1fa",
          100: "#c7daf0",
          200: "#9ec0e4",
          300: "#75a5d8",
          400: "#4c8bcc",
          500: "#185FA5",
          600: "#134e87",
          700: "#0e3d69",
          800: "#0a2c4b",
          900: "#051a2d",
        },
        // Vercel-style light canvas — pure white, crisp dividers.
        paper: {
          50:  "#ffffff",
          100: "#ffffff",
          200: "#eaeaea",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
        },
        // Vercel-style dark canvas — pure black body, slightly lifted card surface,
        // subtle gray borders. High contrast, sharp, modern.
        ink: {
          50:  "#fafafa",   // primary text on dark
          100: "#ededed",   // body text on dark
          200: "#a1a1a1",   // secondary / muted text
          300: "#737373",
          400: "#525252",
          500: "#262626",   // dividers, scrollbar
          600: "#1f1f1f",   // hover surface
          700: "#161616",   // cards
          800: "#0a0a0a",
          900: "#000000",   // body
        },
        success: "#15803d",
        danger:  "#b91c1c",
        // Override slate so every existing `slate-*` class snaps to the warm/ink palette.
        // Lower numbers stay warm/cream (used for light-mode chrome), higher numbers
        // go to soft navy ink (used for dark-mode chrome). Mid-tones become neutral grays
        // that read well on both canvases.
        slate: {
          50:  "#ffffff",   // light body
          100: "#fafafa",   // light cards / hover
          200: "#eaeaea",   // light borders
          300: "#d4d4d4",   // muted
          400: "#a3a3a3",   // neutral
          500: "#737373",   // body text muted
          600: "#525252",
          700: "#262626",   // dark borders
          800: "#161616",   // dark cards
          900: "#0a0a0a",   // dark deeper
          950: "#000000",   // dark body — Vercel signature
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
