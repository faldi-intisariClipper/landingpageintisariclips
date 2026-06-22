/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
        fontFamily: { 
            sans: ['Outfit', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
            disp: ['Fredoka', 'Outfit', 'sans-serif']
        },
        colors: {
            brand: { 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 900: '#1e3a8a' },
            dark: { 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
            accent: { 500: '#f59e0b', 600: '#d97706' }
        }
    }
  },
  plugins: [],
}
