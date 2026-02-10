/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f7',
          100: '#d9e1ec',
          200: '#b3c3d9',
          300: '#8da5c6',
          400: '#6787b3',
          500: '#4a6d9c',
          600: '#3a577d',
          700: '#2a415e',
          800: '#1a2a42',
          900: '#0f1b2d',
          950: '#0b1222',
        },
        copper: {
          50: '#fdf8f5',
          100: '#f9ece4',
          200: '#f2d6c4',
          300: '#e4b899',
          400: '#c4956a',
          500: '#b07d52',
          600: '#9a6840',
          700: '#7d5433',
          800: '#644329',
          900: '#523821',
        },
        gold: {
          50: '#fefdfb',
          100: '#fcf7e8',
          200: '#f8ebc8',
          300: '#f2d997',
          400: '#e9c062',
          500: '#d4a03d',
          600: '#b8842e',
          700: '#976727',
          800: '#7a5225',
          900: '#654422',
        },
        sand: {
          50: '#faf8f5',
          100: '#f5f0ea',
          200: '#ede5db',
          300: '#ddd0c0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'spin-slower': 'spin 40s linear infinite reverse',
        'morph': 'morph 8s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
