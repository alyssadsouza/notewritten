/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          from: {opacity: 0}, to: {opacity: 1}
        }
      },
      animation: {
        'appear': 'appear 100ms ease-in',
      }
    },
  },
  plugins: [],
}

