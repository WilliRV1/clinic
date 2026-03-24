/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,css}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#2563EB",
        "primary-dark": "#1E40AF",
        "primary-light": "#DBEAFE",
        "accent": "#3B82F6",
        "background-light": "#F8FAFC",
        "background-dark": "#0F172A",
        "muted": "#64748B",
        "surface": "#FFFFFF",
      },
      fontFamily: {
        "display": ["Montserrat", "sans-serif"],
        "body": ["Montserrat", "sans-serif"],
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
