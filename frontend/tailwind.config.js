/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          dark: '#1a1a2e',
          darker: '#16213e',
        },
        accent: {
          DEFAULT: '#e63946',
          dark: '#d62839',
          darker: '#c91f2b',
        },
        background: {
          light: '#f5f7fa',
          lighter: '#e4e8ec',
        },
      },
    },
  },
  plugins: [],
}
