const path = require('path');

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const webpack = require('webpack');

const TransferWebpackPlugin = require('transfer-webpack-plugin');

const webpackContext = (new function () {
  this.debugMode = false;
}());

// webpackContext.debugMode value should be passed via cli
process.argv.forEach((val, index) => {
  if (val !== '--define') {
  return;
}

const defineContent = process.argv[index + 1];

if (defineContent.indexOf('DEBUG_MODE') === -1) {
  return;
}

webpackContext.debugMode = defineContent.split('=')[1].toLowerCase() === 'true';
});

// default config(production)
const babelRule = {
  test: /.js(x?)$/,
  loader: 'babel-loader',
  exclude: /(node_modules|bower_components)/,
  query: {
    presets: ['es2015', 'es2017', 'react'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread'],
  },
};

const cssRule = {
  test: /\.(css|scss)$/,
  use: [
    {
      loader: 'style-loader', // inject CSS to page
    },
    {
      loader: 'css-loader', // translates CSS into CommonJS modules
    },
    {
      loader: 'postcss-loader', // Run post css actions
      options: {
        plugins() { // post css plugins, can be exported to postcss.config.js
          return [
            require('precss'),  // eslint-disable-line
            require('autoprefixer'),  // eslint-disable-line
          ];
        },
      },
    },
    {
      loader: 'sass-loader', // compiles SASS to CSS
    },
  ],
};

const config = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new webpack.DefinePlugin({
      DEBUG_MODE: JSON.stringify(webpackContext.debugMode),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
    new TransferWebpackPlugin([
      { from: 'css', to: 'css' },
      { from: 'fonts', to: 'fonts' },
      { from: 'img', to: 'img' },
      { from: 'locales', to: 'locales' },
    ], path.resolve(__dirname, 'src')),
  ],
  entry: [
    'babel-polyfill',
    './src/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index-bundle.js',
    // sourceMapFilename: 'index-bundle.map',
  },
  // devtool: 'source-map',
  module: {
    rules: [
      babelRule,
      cssRule,
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

if (webpackContext.debugMode) {
  console.log(`debug mode enabled, value is ${webpackContext.debugMode}`);
  config.plugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new webpack.DefinePlugin({
      DEBUG_MODE: JSON.stringify(webpackContext.debugMode),
    }),
  ];

  const eslintRule = {
    test: /\.js(x?)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    include: `${__dirname}`,
    exclude: /bundle\.js$/,
    options: {
      quiet: true,
      emitWarning: false,
      emitError: false,
      failOnWarning: false,
      failOnError: false,
    },
  };
  config.module.rules = [eslintRule].concat(config.module.rules);

  babelRule.query.plugins.push('react-hot-loader/babel');
  console.log('debug mode');
}

config.devServer = {
  port: 8000,
  contentBase: './src',
  historyApiFallback: {
    index: './index.html',
  },
  hot: true,
  inline: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },

};

module.exports = config;
