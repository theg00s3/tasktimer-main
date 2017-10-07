var PRO = true
if (process.env.ENV !== undefined) {
  PRO = (process.env.ENV === 'PRO')
}

console.log('-- building for ', PRO ? 'PRO' : 'DEV')

var commonConfig = require('./webpack-common.config.js')(PRO)
var webpack = require('webpack')

var prodLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - without the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader']
  }
]

module.exports = {
  entry: [
  // our entry file
    './src/index.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  devtool: 'source-map',
  module: {
    loaders: commonConfig.loaders.concat(prodLoaders)
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {drop_debugger: false}}),
    commonConfig.indexPagePlugin
  ].concat(commonConfig.plugins)
}
