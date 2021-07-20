const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const filename = (ext) =>
  isDevelopment ? `bundle.${ext}` : `bundle.[chunkhash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'esbuild-loader',
      options: {
        loader: 'ts',
        target: 'es2015',
      },
    },
  ];

  if (isDevelopment) {
    loaders.push({ loader: 'eslint-loader' });
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDevelopment ? 'eval' : false,
  devServer: {
    port: process.env.PORT || 3000,
    hot: isDevelopment,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: require('./postcss.config.js'),
            },
          },
        ],
      },
      {
        test: /\.[jt]s?$/,
        use: jsLoaders(),
      },
    ],
  },
};
