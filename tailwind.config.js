/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      gridColumnStart: {
        '10': '10',
      },
      gridRowStart: {
        '10': '10',
      },
      transitionProperty: {
        'background-position': 'background-position',
      },
    },
  },
  plugins: [],
};
