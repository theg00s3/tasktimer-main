console.log('-- process.env.NODE_ENV', process.env.NODE_ENV)
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var commonConfig = require('./webpack-common.config.js')(false)

var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new HtmlWebpackPlugin({
    title: 'Pomodoro.cc - Time tracking with the Pomodoro technique',
    filename: 'index.html',
    template: './index_template.html'
  }),
]

var development = process.env.NODE_ENV === 'development'
var test = process.env.NODE_ENV === 'test'

var loaders = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loaders: (!test || development)
            ? ['react-hot', 'babel-loader']
            : ['babel-loader']
}]

var entryFile = './index.js'
var webpackConfig = {
  context: __dirname + '/src',
  entry: entryFile,
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: commonConfig.loaders.concat(loaders)
  },
  plugins: commonConfig.plugins.concat(plugins),
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
}

if (development) {
  webpackConfig.entry = [
    'webpack-dev-server/client?http://127.0.0.1:9000',
    'webpack/hot/dev-server',
    // 'webpack/hot/only-dev-server',
    entryFile
  ]
  webpackConfig.devtool = 'eval'
}

module.exports = webpackConfig
