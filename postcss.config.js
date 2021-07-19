module.exports = {
  plugins: [
    require("stylelint"),
    require("postcss-easy-import"),
    require("postcss-advanced-variables"),
    require("autoprefixer"),
    require("postcss-browser-reporter"),
  ],
};
