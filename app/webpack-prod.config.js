const webpack = require('webpack')
const commonConfig = require('./webpack-common.config.js')(true)

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  devtool: 'source-map',
  resolve: Object.assign({}, commonConfig.resolve),
  module: {
    loaders: commonConfig.loaders.concat([{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }])
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {drop_debugger: false}})
  ].concat(commonConfig.plugins)
}
