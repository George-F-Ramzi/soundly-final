/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: { button: "#CCCCCC" },
      textColor: { white: "#F2F2F2", para: "#999999" },
      borderColor: { default: "#535353", active: "#F2F2F2" },
    },
    gridTemplateColumns: {
      cards: "repeat(auto-fit, minmax(144px, 1fr));",
    },
  },
  plugins: [],
};
