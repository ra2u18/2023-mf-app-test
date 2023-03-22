const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { ModuleFederationPlugin } = webpack.container;
const deps = require('../../package.json').dependencies;
function inDev() {
  return process.env.NODE_ENV == 'development';
}

module.exports = {
  mode: 'development',
  entry: ['./src/main.ts'],
  output: {
    publicPath: 'http://localhost:8081/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        // Typescript loader
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        // CSS Loader
        test: /\.css$/,
        use: [
          { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        // Assets loader
        // More information here https://webpack.js.org/guides/asset-modules/
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
        generator: {
          filename: 'public/assets/[hash][ext][query]',
        },
      },
    ],
  },
  /** Plugins and resolve */
  plugins: [
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
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,

          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,

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
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: require('./helpers/webpack.aliases'),
  },
  devServer: {
    port: 8081,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  stats: 'errors-warnings',
  devtool: 'eval-cheap-module-source-map',
};
