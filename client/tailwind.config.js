/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706', // Primary Deep Saffron
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        spiritual: {
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          ivory: '#FFFDF7',
          maroon: '#6D1F2B',
          maroonDark: '#4A121A',
          forest: '#285943',
          charcoal: '#252525',
          warmGray: '#F5F2EB',
          sand: '#ECE5D8',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'spiritual': '0 4px 20px -2px rgba(217, 119, 6, 0.12), 0 2px 6px -1px rgba(109, 31, 43, 0.08)',
        'spiritual-lg': '0 10px 30px -4px rgba(212, 175, 55, 0.2), 0 4px 12px -2px rgba(109, 31, 43, 0.12)',
      }
    },
  },
  plugins: [],
}
