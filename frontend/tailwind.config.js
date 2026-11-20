/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#030712',
          deep: '#02040a',
          navy: '#050a1a',
          surface: '#0a1026',
          card: 'rgba(10, 16, 38, 0.8)',
          border: 'rgba(6, 182, 212, 0.25)',
          borderPurple: 'rgba(168, 85, 247, 0.25)',
          cyan: '#00f0ff',
          cyanMuted: '#06b6d4',
          blue: '#3b82f6',
          purple: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981',
          text: '#f1f5f9',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'spin-reverse-slow': 'spinReverse 30s linear infinite',
        'float-subtle': 'floatSubtle 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.7))' },
        },
      },
    },
  },
  plugins: [],
}
