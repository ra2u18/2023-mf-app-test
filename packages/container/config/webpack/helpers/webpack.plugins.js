const webpack = require('webpack');

const { ModuleFederationPlugin } = webpack.container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { inDev } = require('./webpack.helpers');
const deps = require('../../../package.json').dependencies;

module.exports = [
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new ModuleFederationPlugin({
    name: 'container',
    remotes: {
      dashboard: 'dashboard@http://localhost:8081/remoteEntry.js',
    },
    shared: {
      ...deps,
      react: { singleton: true, eager: true, requiredVersion: deps.react },
      'react-dom': {
        singleton: true,
        eager: true,
        requiredVersion: deps['react-dom'],
      },
      'react-router-dom': {
        singleton: true,
        eager: true,
        requiredVersion: deps['react-router-dom'],
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: 'public/index.html',
    inject: true,
  }),
  new ForkTsCheckerWebpackPlugin(),
  // new MiniCssExtractPlugin({
  //   filename: '[name].[chunkhash].css',
  //   chunkFilename: '[name].[chunkhash].chunk.css',
  // }),
].filter(Boolean);
