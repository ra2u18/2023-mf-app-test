const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { ModuleFederationPlugin } = webpack.container;
const deps = require('../../../package.json').dependencies;

const { inDev } = require('./webpack.helpers');

module.exports = [
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new ModuleFederationPlugin({
    name: 'dashboard',
    filename: 'remoteEntry.js',
    exposes: {
      './DashboardApp': './src/bootstrap',
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
