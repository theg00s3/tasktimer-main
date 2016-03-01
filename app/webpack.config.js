var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var commonConfig = require('./webpack-common.config.js')(false);
module.exports = {
  context: __dirname + "/src",
  entry: "./index.js",
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: commonConfig.loaders,
  },
  plugins: commonConfig.plugins.concat([new HtmlWebpackPlugin({
                                        title: 'Pomodoro.cc - Time tracking with the Pomodoro technique',
                                        filename: 'index.html',
                                        template: './index_template.html'
                                      })]),
}
