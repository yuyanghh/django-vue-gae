let mix = require('laravel-mix');

mix.setResourceRoot('/static');
mix.setPublicPath('static/');

let resourcesPath = 'frontend';
// let coreStaticPath = 'apps/core/static/build';
let coreStaticPath = 'core';
mix.js(`${resourcesPath}/main.js`, `${coreStaticPath}/`).vue({ version: 3 });
mix.postCss(`${resourcesPath}/assets/app.css`, `${coreStaticPath}/`);

mix.browserSync('localhost:8000');
mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.(postcss)$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
});
