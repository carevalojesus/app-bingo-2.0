/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bungee', 'Impact', 'system-ui', 'sans-serif'],
        ui: ['Archivo', 'system-ui', 'sans-serif'],
      },
      colors: {
        crema: '#fff3df',
        papel: '#f3dfb8',
        tinta: '#14112b',
        escenario: '#1a0d36',
        tomate: '#ff5a36',
        girasol: '#ffc43d',
        menta: '#19c3a0',
        cobalto: '#3d6bff',
        fucsia: '#ff4fa3',
      },
      boxShadow: {
        'duro-sm': '3px 3px 0 0 #14112b',
        duro: '5px 5px 0 0 #14112b',
        'duro-lg': '8px 8px 0 0 #14112b',
      },
    },
  },
  plugins: [],
};
