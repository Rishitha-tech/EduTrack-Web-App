/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}" // keep if you have /app; safe to leave in
  ],
  theme: {
    extend: {
      colors: {
        accent: "#E6FF00",   // neon yellow
        surface: "#101010",  // card background
        outline: "#1f1f1f",  // thin border
      },
      boxShadow: {
        neon: "0 8px 0 #c7d600",
        card: "0 0 0 1px #1f1f1f",
      },
      fontFamily: {
        display: ["Poppins", "Inter", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl2: "1.25rem", // custom size ok
      },
    },
  },
  plugins: [],
};
