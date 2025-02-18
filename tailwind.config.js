/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'gray-300.5': 'rgba(186,186,186,0.612)',
        'primary': 'rgb(29,246,255)',
        'second': 'rgb(0,90,93)',
        'dark-theme': 'rgb(36,36,36)',
        'transluxed': 'rgba(255,255,255,0.027)',
        'dark-transluxed': 'rgba(0,0,0,0.698)',
      }
    },
  },
  plugins: [],
}