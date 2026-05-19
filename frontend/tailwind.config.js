/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FEFAE8',
        parchment: '#DDD9B0',
        forest: '#2E7D2E',
        'deep-forest': '#1A4D1A',
        moss: '#4A7C4A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
        'typewriter': 'typewriter 0.05s steps(1) forwards',
        'pulse-highlight': 'pulseHighlight 1s ease-in-out',
        'bounce-scale': 'bounceScale 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseHighlight: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: '#DDD9B0' },
        },
        bounceScale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'leaf': '0 2px 12px rgba(46, 125, 46, 0.12)',
        'leaf-lg': '0 8px 32px rgba(46, 125, 46, 0.16)',
        'parchment': '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
