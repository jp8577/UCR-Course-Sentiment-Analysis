/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // All TSX/JSX source files
    "./src/app/globals.css",       // Include CSS files too
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};