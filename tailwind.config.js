/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      base: ['Fira Sans', 'sans-serif'],
      mono: ["Fira Code", "monospace"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
