module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {
      stage: 0,
    },
    cssnano: {},
  },
};
