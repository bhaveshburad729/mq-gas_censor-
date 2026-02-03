/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa", // Soft off-white/gray
        surface: "#ffffff",
        primary: "#2d3436", // Dark gray/black for text/headers
        secondary: "#636e72", // Muted gray for subtext
        accent: "#00b894", // Muted green (Mint Leaf)
        warning: "#fdcb6e", // Muted orange (Sunflower)
        danger: "#ff7675", // Soft red (Pink Glamour)
        safe: "#55efc4", // Soft green
        border: "#dfe6e9",
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
