const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack-common.config.js')(true)

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash].js'
  },
  devtool: 'source-map',
  resolve: Object.assign({}, commonConfig.resolve),
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pomodoro.cc - Time tracking with the Pomodoro technique',
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index_template.html')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })

  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          'file-loader?name=[name].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(css|styl)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
            // options: {
            //   // you can specify a publicPath here
            //   // by default it use publicPath in webpackOptions.output
            //   publicPath: '../'
            // }
          },
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }]
      },
      {
        test: /\.(mp3|ogg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              context: './src'
            }
          }
        ]
      }

    ]
  }

  // module: {
  //   loaders: commonConfig.loaders || [].concat([{
  //     test: /\.jsx?$/,
  //     exclude: /node_modules/,
  //     loaders: ['babel-loader']
  //   }])
  // }
  // plugins: [
  //   new webpack.DefinePlugin({
  //     NODE_END: '"production"'
  //   })
  // ].concat(commonConfig.plugins)
}
