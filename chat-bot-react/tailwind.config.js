// tailwind.config.js
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./path/to/your/components/**/*.{js,jsx,ts,tsx}",  // Adjust the path as necessary
    "./node_modules/@nextui-org/react/dist/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
