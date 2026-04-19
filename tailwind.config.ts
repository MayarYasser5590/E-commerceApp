/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './apps/**/*.{html,ts,scss}', // shop + admin
    './libs/**/*.{html,ts,scss}', // shared components
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
