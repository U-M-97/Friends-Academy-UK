/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    
    extend: {
      colors:{
        pink: "#e75387",
        green: "#88ced0",
        font: "#595f5f",
        gray: "#7592a0",
        lightGray: "lightGray"
      },
      fontFamily:{
        main: ['Nunito Sans', "sans-serif"]
      },
      width:{
        width: "1600px",
        picturesWrapper: "300vw",
        translateWidth: "100vw",
        box: "570px",
      },
      scale:{
        arrow: "3"
      },
      height:{
        slider: "600px",
        about: "900px"
      },
      borderRadius:{
        half: "50%"
      }
    },
  },
  plugins: [],
}
