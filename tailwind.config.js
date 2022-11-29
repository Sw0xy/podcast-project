/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* container: {
        screens: {
          sm: "968px",
          md: "1224px",
          lg: "1480px",
          xl: "1740px",
          "2xl": "1496px",
        },
      }, */
      colors: {
        grey: "#F8F8F8",
        bg: "#191A23",
        hover: "#272832",
        border: "#313248",
        text: "#858699",
        secondary: "#1D1E2B",
        light_text: "#D2D3E0",
        label_red: "#FF3E3E",
      },
    },
  },
  plugins: [],
};
