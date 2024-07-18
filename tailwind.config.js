/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B931FC",
        danger: "#FF4C4C",
        warning: "#FFB22C",
      },
    },
  },
  plugins: [],
};