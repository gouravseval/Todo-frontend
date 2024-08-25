/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customcyan: '#09A5D6', // Replace with your desired color value
      },
    },
  },
  plugins: [],
}
