/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ajustamos el content para que busque en TODAS las carpetas donde pusimos código
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./presentation/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}