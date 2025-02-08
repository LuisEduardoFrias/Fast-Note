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
        'dark-theme': 'rgb(36,36,36)',
      }
    },
  },
  plugins: [],
}