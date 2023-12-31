/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#8a5cf5",
        color1: "rgb(var(--C1) / <alpha-value>)",
        color2: "rgb(var(--C2) / <alpha-value>)",
        color3: "rgb(var(--C3) / <alpha-value>)",
        color4: "rgb(var(--C4) / <alpha-value>)",
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
