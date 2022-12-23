module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontSize: {
        xxs: [
          "0.7rem",
          {
            lineHeight: "0.9rem",
          },
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
