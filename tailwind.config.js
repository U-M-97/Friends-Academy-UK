/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    
    extend: {
      colors:{
        pink: "#e75387",
        green: "#88ced0",
        greenHover: "#A0D8D9",
        font: "#595f5f",
        gray: "#7592a0",
        lightGray: "lightGray",
        servicesBG: "#f3fafa",
        login: "#dae5e8",
        google: "	#DB4437",
        facebook: "#3b5998",
        facebookHover: "#2F477A",
        googleHover: "#CCCCCC"
      },
      fontFamily:{
        main: ['Nunito Sans', "sans-serif"]
      },
      width:{
        width: "1500px",
        picturesWrapper: "300vw",
        translateWidth: "100vw",
        plabWidth: "1400px",
        box: "570px",
        card: "380px",
        aboutWidth: "1200px",
        aboutPic: "500px",
        testimonials: "600px",
        testimonialsContainer: "1400px",
        svg: "200px"
      },
      scale:{
        arrow: "3",
        services: "3",
        testimonialArrow: "2",
        trustedBy: "4"
      },
      height:{
        slider: "600px",
        about: "900px",
        card: "320px",
        aboutPic: "550px",
        accommodation: "500px",
        testimonials: "405px",
        svg: "200px"
      },
      borderWidth:{
        aboutPic: "10px",
        footer: "1px"
      },
      padding:{
        important: "2px"
      },
      translate:{
        cards: "340px"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
