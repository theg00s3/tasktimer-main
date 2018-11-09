const development = process.env.NODE_ENV === 'development'

const commonConfig = require('./webpack-common.config')

module.exports = Object.assign({}, commonConfig, development ? {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:9000',
    'webpack/hot/dev-server',
    // 'webpack/hot/only-dev-server',
    './index.js'
  ],
  devtool: 'eval'
} : {})
