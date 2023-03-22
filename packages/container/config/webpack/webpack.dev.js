module.exports = {
  mode: 'development',
  entry: ['./src/main.ts'],
  output: {
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
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
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  stats: 'errors-warnings',
  devtool: 'eval-cheap-module-source-map',
};
