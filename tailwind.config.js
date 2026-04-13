/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0058be",
        "primary-container": "#2170e4",
        "on-primary": "#ffffff",
        "on-primary-container": "#fefcff",
        secondary: "#495e8a",
        "secondary-container": "#b6ccff",
        background: "#f7f9fb",
        surface: "#f7f9fb",
        "surface-variant": "#e0e3e5",
        "on-surface": "#191c1e",
        "on-surface-variant": "#424754",
        "outline-variant": "#c2c6d6",
        tertiary: "#924700",
        "tertiary-container": "#b75b00",
        "tertiary-fixed": "#ffdcc6",
        "primary-fixed-dim": "#adc6ff",
      },
    },
  },
  plugins: [],
};
