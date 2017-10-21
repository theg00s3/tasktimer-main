const {join} = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')

const commonConfig = require('./webpack-common.config.js')(false)

const development = process.env.NODE_ENV === 'development'
const test = process.env.NODE_ENV === 'test'

const entryFile = './index.js'
const webpackConfig = {
  context: join(__dirname, '/src'),
  entry: entryFile,
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  resolve: Object.assign({}, commonConfig.resolve),
  module: {
    loaders: commonConfig.loaders.concat([{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: (!test || development)
                ? ['react-hot', 'babel-loader']
                : ['babel-loader']
    }])
  },
  plugins: commonConfig.plugins.concat([
    new DashboardPlugin()
  ])
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
