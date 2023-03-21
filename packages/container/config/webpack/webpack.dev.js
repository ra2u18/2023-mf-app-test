module.exports = {
  mode: 'development',
  entry: ['./src/main.ts'],
  output: {
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: require('./helpers/webpack.rules'),
  },
  /** Plugins and resolve */
  plugins: require('./helpers/webpack.plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: require('./helpers/webpack.aliases'),
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  stats: 'errors-warnings',
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
