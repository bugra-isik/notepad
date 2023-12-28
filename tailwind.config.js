/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#8a5cf5",
      },
      fontFamily: {
        caveat: "'Caveat', cursive",
        "dancing-script": "'Dancing Script', cursive",
        roboto: "font-family: 'Roboto', sans-serif",
      },
    },
  },
  plugins: [require("daisyui")],
};
