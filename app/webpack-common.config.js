var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(production){
  var segment_write_key = production ? 'DI4YQLtpCkiyMnlITlg8o3pO6UDrnmbx' : 'u8FtwJOHxRRYAfIhZOv78SGzcQta1Yty'
  return {
    plugins: [
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': production ? '"production"' : '"development"'
      })
    ],
    loaders: [
    // image loader - https://www.npmjs.com/package/image-webpack-loader
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      loaders: [
      'file?name=[name].[ext]',
      'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    {
      test: /\.(mp3|ogg)$/i,
      loaders: [
        'file?name=[name].[ext]&context=./src',
      ]
    },
    // javascript/jsx loader - https://www.npmjs.com/package/babel-loader
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [ 'babel-loader' ],
    },
    // styles
    {
      test: /\.(styl|css)$/,
      loader: "style!css!postcss-loader?browsers=last 2 version!stylus-loader",
    },
    ],
    // https://www.npmjs.com/package/html-webpack-plugin - generate our html file from a template - makes it easier to include custom stuff
    indexPagePlugin: new HtmlWebpackPlugin({
                            title: 'Pomodoro.cc - Time tracking with the Pomodoro technique',
                            filename: 'index.html',
                            template: './src/index_template.html'
                          })
  }
}
