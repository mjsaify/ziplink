/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary-pink": "#EB568E",
        "brand-primary-blue": "#144EE3",
        "brand-primary-black": "#0b101b",
        black: "#0b101b",
        grey: "#181e29",
        "grey-lite": "#353C4A",
        lite: "#C9CED6",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(90deg, #144EE3 0%, #EB568E 19%, #A353AA 64%, #144EE3 100%)"
      }
    }
  },
  plugins: [],
}