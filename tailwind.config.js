/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF8F4",
          100: "#F2E8E3",
          200: "#E6D1C7",
          300: "#D9BAAB",
          400: "#CCA38F",
          500: "#BF8C73",
          600: "#B17253",
          700: "#976044",
          800: "#7B4E38",
          900: "#5F3C2B",
          950: "#311F16"
        },
      },
      fontFamily: {
        'primary-1': 'var(--font-primary-1)',
        'primary-2': 'var(--font-primary-2)',
        'primary-3': 'var(--font-primary-3)',
      },
    }
  },
  plugins: [],
}

