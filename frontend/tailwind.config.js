/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "12px",
        sm: "15px",
        base: "18px",
      },

      screens: {
        sm: { max: "640px" },
        md: { min: "415px", max: "800px" },
      },

      backgroundImage: {
        Bgg: "url(/src/images/background.jpg)",
        Bgg2: "url(/src/images/image8.jpg)",
      },
    },
  },
  plugins: [],
};
