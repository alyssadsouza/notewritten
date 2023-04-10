/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

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
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '0.5rem 1.25rem',
          borderRadius: '.5rem',
          transition: 'all 300ms'
        },
        '.btn-green': {
          backgroundColor: '#10b981',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#059669'
          },
        },
        '.alert': {
          padding: '0.5rem 1.25rem',
          borderRadius: '.5rem',
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignContent: 'items-center',
          gap: '1rem'
        },
        '.alert-red': {
          backgroundColor: 'rgba(217, 33, 0, 0.1)',
          color: 'rgb(217, 33, 0)',
          border: '1px solid rgb(217, 33, 0)'
        },
      })
    })
  ],
}

