const webpack = require('webpack')
const commonConfig = require('./webpack-common.config.js')(true)

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
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
    new webpack.DefinePlugin({
      NODE_END: '"production"'
    })
  ].concat(commonConfig.plugins)
}
