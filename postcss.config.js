module.exports = {
    plugins: {
      tailwindcss: {},
      postcss: [require('autoprefixer'), require('postcss-preset-env')],
    },
  };