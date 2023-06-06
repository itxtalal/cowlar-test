/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bridge': "url('/public/red-bridge.webp')",
      }
    },
  },
  plugins: [],
}

