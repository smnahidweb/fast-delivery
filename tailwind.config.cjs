/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D1F254",    // Light green
        secondary: "#A3E635",  // Lime green
        accent: "#4ADE80",     // Emerald
        neutral: "#3D4451",
        info: "#60A5FA",
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
