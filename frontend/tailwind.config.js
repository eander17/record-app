/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
      },
      colors: {
        transparent: 'transparent',
        'fa-plus': '#7cb342',
        'fa-edit': '#ff9800',
        'fa-delete': '#dc3545',
        'fa-prev': '#fff',
        'fa-next': '#fff',
        'fa-save': '#007bff',
      },
    },
  },

  plugins: [require('daisyui'), require('@tailwindcss/typography')],

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: 'dark',
  },
}
