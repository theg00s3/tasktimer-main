const {join} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (production) {
  return {
    context: join(__dirname, '/src'),
    resolve: {
      alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },
    optimization: {
      minimize: true,
      runtimeChunk: true,
      splitChunks: {
        chunks: 'async',
        minSize: 1000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          }
        }
      }
    }
    // plugins: [
    //   new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': production ? '"production"' : '"development"',
    //     'NODE_ENV': production ? '"production"' : '"development"'
    //   }),
    //   new HtmlWebpackPlugin({
    //     title: 'Pomodoro.cc - Time tracking with the Pomodoro technique',
    //     filename: 'index.html',
    //     template: join(__dirname, 'src', 'index_template.html')
    //   }),
    //   new ExtractTextPlugin('style.css', { allchunks: true })
    // ],
    // loaders: [
    //   {
    //     test: /\.(jpe?g|png|gif|svg|ico)$/i,
    //     loaders: [
    //       'file?name=[name].[ext]',
    //       'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
    //     ]
    //   },
    //   {
    //     test: /\.(styl|css)$/,
    //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader?browsers=last 2 version')
    //   },
    //   {
    //     test: /\.(mp3|ogg)$/i,
    //     loader: 'file?name=[name].[ext]&context=./src'
    //   }
    // ]
  }
}
