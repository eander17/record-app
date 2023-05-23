/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
      },
      colors: {
        transparent: 'transparent',
        primary: '#F4F4F4',
        eggs: '#e6e6e6',

        secondary: '#7072D2',
        'secondary-dark': '#25234D',
        'lt-blue': '#006A8A',
        'midnight-blue': '#202142',
        'new-blue': '#DFD3C3',

        void: '#0e0B16',
        'fuschia-custom': '#A239CA',
        jewel: '#4717f6',
        stark: '#E7DFDD',

        electric: '#3cc47c',
        forest: '#1e392a',
        light: '#e9c893',
        tin: '#828081',

        'fa-plus': '#7cb342',
        'fa-edit': '#ff9800',
        'fa-delete': '#dc3545',
        'fa-prev': '#fff',
        'fa-next': '#fff',
        'fa-save': '#007bff',
      },
    },
  },

  plugins: [],
}
