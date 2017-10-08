var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (production) {
  return {
    resolve: {
      alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'NODE_ENV': '"production"'
      })
    ],
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          'file?name=[name].[ext]',
          'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(styl|css)$/,
        loader: 'style!css?browsers=last 2 version!stylus-loader'
      },
      {
        test: /\.(mp3|ogg)$/i,
        loader: 'file?name=[name].[ext]&context=./src'
      }
    ],
    indexPagePlugin: new HtmlWebpackPlugin({
      title: 'Pomodoro.cc - Time tracking with the Pomodoro technique',
      filename: 'index.html',
      template: './src/index_template.html'
    })
  }
}
