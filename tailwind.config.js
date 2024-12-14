/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
