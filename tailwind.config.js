/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#f4ecd8',
          DEFAULT: '#e6d7b8',
          dark: '#c8b38a',
        },
        medieval: {
          gold: '#dfb76c',
          goldGlow: '#ffd700',
          leather: '#2b1810',
          ink: '#1c1612',
          ruby: '#8b0000',
          emerald: '#0f5257',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'serif'],
      },
      boxShadow: {
        'inner-tome': 'inset 0 0 40px rgba(43, 24, 16, 0.25)',
        'gold-glow': '0 0 15px rgba(223, 183, 108, 0.4)',
        'magical-glow': '0 0 25px rgba(147, 51, 234, 0.5)',
      }
    },
  },
  plugins: [],
}