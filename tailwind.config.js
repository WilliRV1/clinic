/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./en/*.html",
    "./src/**/*.{js,css}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0033cc",
        "primary-dark": "#013791",
        "primary-light": "#a4d1fb",
        "accent": "#0033cc", /* Mapping accent to primary for now, could be another color if needed */
        "background-light": "#f2eee3",
        "background-dark": "#0F172A",
        "muted": "#64748b",
        "surface": "#FFFFFF",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px",
      },
    },
  },
  plugins: [],
}
