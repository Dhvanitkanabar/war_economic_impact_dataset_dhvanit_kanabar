/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Amber-red war theme accent
        accent: {
          50:  '#fff8f0',
          100: '#feecda',
          200: '#fcd4a8',
          300: '#f9b56d',
          400: '#f78c35',
          500: '#f56e10',  // primary orange
          600: '#e55507',
          700: '#c03e08',
          800: '#973211',
          900: '#7b2b13',
          950: '#431206',
        },
        crimson: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        // Dark slate neutrals
        ink: {
          50:  '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae3',
          300: '#b0bac9',
          400: '#8594a8',
          500: '#677689',
          600: '#536071',
          700: '#444f5e',
          800: '#3b4351',
          900: '#343b47',
          950: '#1e2430',
        },
        dark: '#0b0e14',
        card: '#111720',
        border: '#1e2736',
        muted: '#8594a8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-accent': '0 0 40px -8px rgba(245, 110, 16, 0.4)',
        'glow-crimson': '0 0 40px -8px rgba(239, 68, 68, 0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
