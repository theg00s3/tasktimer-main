console.log( '-- process.env.NODE_ENV', process.env.NODE_ENV )
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var commonConfig = require('./webpack-common.config.js')(false);

var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new HtmlWebpackPlugin({
    title: 'Pomodoro.cc - Time tracking with the Pomodoro technique',
    filename: 'index.html',
    template: './index_template.html'
  })
]

var loaders = []
if( process.env.NODE_ENV === 'development' ) {
  loaders.push({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel-loader'],
  })
}

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: commonConfig.loaders.concat(loaders),
  },
  plugins: commonConfig.plugins.concat(plugins),
}
