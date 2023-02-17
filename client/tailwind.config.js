module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
}