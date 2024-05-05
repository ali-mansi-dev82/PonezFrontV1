/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#2F80C0",
          0: "#FCDDE0",
          10: "#f7b0b7",
          20: "#f69da6",
          30: "#f27582",
          40: "#ee4e5e",
          50: "#d43444",
          60: "#d43444",
          70: "#bd2e3d",
          80: "#a52935",
          90: "#8e232e",
          100: "#471117",
        },
        secondary: {
          default: "#1d1e22",
          0: "#e8e9e9",
          10: "#d2d2d3",
          20: "#bbbcbd",
          30: "#a5a5a7",
          40: "#8e8f91",
          50: "#77787a",
          60: "#616264",
          70: "#4a4b4e",
          80: "#343538",
          90: "#471117",
          100: "#17181b",
        },
        dark: "#1D1E22",
      },
      fontFamily: {
        Vazir: ["./src/font/Vazir.ttf"],
      },
      dropShadow: {
        modal: "0 35px 35px rgba(0,0,0,0.25)",
      },
      boxShadow: {
        bottomNavigate: "-1px 0 10px rgba(0,0,0,0.2)",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1224px",
      xl: "1480px",
      "2xl": "1536px",
    },
  },
};
