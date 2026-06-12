/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f5f0e1',
        'paper-dark': '#e8dfc8',
        ink: '#2c2c2c',
        'ink-light': '#5a5a5a',
        vermillion: '#b22222',
        'vermillion-dark': '#8b1a1a',
        'vermillion-light': '#d44444',
        gold: '#c4a35a',
        'gold-light': '#d4b86a',
        bamboo: '#6b8e23',
        'bamboo-dark': '#4a6a10',
        jade: '#7fb685',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
        kai: ['"KaiTi"', '"STKaiti"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-slow': 'fadeIn 1.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'ink-spread': 'inkSpread 1.2s ease-out',
        'stat-change': 'statChange 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
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
        inkSpread: {
          '0%': { opacity: '0', transform: 'scale(0.8)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
        },
        statChange: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 5px rgba(178,34,34,0.3)' },
          '50%': { textShadow: '0 0 15px rgba(178,34,34,0.6)' },
        },
      },
    },
  },
  plugins: [],
};
