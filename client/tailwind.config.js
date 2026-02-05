/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#171123", // Deep Dark
        surface: "#1D162B", // Slightly lighter for cards
        primary: "#FBFBFB", // White text
        secondary: "#d1d5db", // Light gray subtext
        accent: "#6F2DBD", // Brand Purple
        highlight: "#A663CC", // Lavender
        warning: "#fdcb6e",
        danger: "#ff7675",
        safe: "#55efc4",
        border: "#2d2640", // Dark purple border
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      }
    },
  },
  plugins: [],
}
