/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Patua One"', 'serif'],
        ui: ['Play', 'system-ui', 'sans-serif'],
      },
      colors: {
        bb: '#f5365c',
        bi: '#ffd600',
        bn: '#2dce89',
        bg: '#5e72e4',
        bo: '#8965e0',
      },
    },
  },
  plugins: [],
};
