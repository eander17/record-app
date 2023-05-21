/**
 * @format
 * @type {import('tailwindcss').Config}
 */

// const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
      },
    },
  },
  plugins: [],
}
