/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your custom classes here
      colors: {
        // Example: 'brand': '#your-color',
      },
      // You can extend spacing, fonts, etc.
    },
  },
  plugins: [],
}
