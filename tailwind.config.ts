const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
      "2xl": "1600px", // 1600x900
      "3xl": "1920px", // 1920x1080
      "4xl": "2160px", // 2160x1080
      "5xl": "2560px", // 2560x1440
      "6xl": "2960px", // 2960x1440
      "7xl": "3840px", // 3840x2160
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1600px",
        "3xl": "1920px",
      },
    },
    extend: {
      colors: {
        custom: {
          purple: {
            300: "#A881E6",
            500: "#7450AC",
            700: "#523480",
          },
          gray: {
            200: "#FBF9FE",
            400: "#AFABB6",
            600: "#252529",
            700: "#17171A",
            800: "#111112",
            900: "#0C0C0D",
          },
          green: {
            300: "#4E995E",
            500: "#2F723D",
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
