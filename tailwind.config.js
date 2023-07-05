/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: { white: "#F2F2F2", para: "#999999" },
      screens: {
        phone: { max: "430px" },
      },
      borderColor: { default: "#535353", active: "#F2F2F2" },
    },
  },
  plugins: [],
};
