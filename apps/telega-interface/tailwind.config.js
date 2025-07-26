/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'telega-orange': '#F28C38',
        'telega-purple': '#6C5CE7',
        'telega-yellow': '#FFC107',
        'telega-blue': '#74C0FC',
        'telega-dark': '#121212',
        'telega-light': '#FFFFFF',
        'telega-text-dark': '#2D3436',
        'telega-text-light': '#ECEFF1',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.8',
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-200px 0',
          },
          '100%': {
            'background-position': 'calc(200px + 100%) 0',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        telega: '0 10px 25px rgba(242, 140, 56, 0.3)',
        'telega-purple': '0 10px 25px rgba(108, 92, 231, 0.3)',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
    },
  },
  plugins: [],
};
