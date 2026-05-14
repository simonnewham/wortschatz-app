/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#5c5c99',
        secondary: '#8252fdff',
        accent: '#d4fd52',
        background_primary: '#000000ff',
        text_primary: '#000000ff',
      },
    },
  },
  plugins: [],
}