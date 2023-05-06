/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        math: ["Libre Caslon Display", "ui-serif"],
      },
      keyframes: {
        appear: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        appear: "appear 100ms ease-in",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn": {
          padding: "0.5rem 1.25rem",
          borderRadius: ".5rem",
          transition: "all 300ms",
        },
        ".btn-primary": {
          backgroundColor: "rgb(20,184,166)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgb(13,148,136)",
          },
        },
        ".alert": {
          padding: "0.5rem 1.25rem",
          borderRadius: ".5rem",
          display: "inline-flex",
          justifyContent: "space-between",
          alignContent: "items-center",
          gap: "1rem",
        },
        ".alert-red": {
          backgroundColor: "rgba(217, 33, 0, 0.1)",
          color: "rgb(217, 33, 0)",
          border: "1px solid rgb(217, 33, 0)",
        },
        ".alert-green": {
          backgroundColor: "rgba(0, 217, 98, 0.1)",
          color: "rgb(0, 217, 98)",
          border: "1px solid rgb(0, 217, 98)",
        },
      });
    }),
  ],
};
