let plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant("app-store-view-first", "&:nth-child(4n+1)");
      addVariant("app-store-view-last", "&:nth-child(4n+4)");
    }),
  ],
};
