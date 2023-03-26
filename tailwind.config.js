/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FCF8EC',
        secondary: '#D0E8F2',
        highlights: '#79A3B1',
        accent: '#456268'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
