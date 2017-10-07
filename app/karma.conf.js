var commonConfig = require('./webpack-common.config.js')(false)

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: ['mocha', 'sinon', 'sinon-chai', 'chai', 'phantomjs-shim'],
    files: [
      'test.webpack.js' // just load this file
    ],
    preprocessors: {
      'test.webpack.js': ['webpack']
    },
    reporters: ['dots'], // report results in this format
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: commonConfig.loaders.concat([{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        }]),
        plugins: commonConfig.plugins
      }
    },
    webpackServer: {
      noInfo: false // please don't spam the console when running in karma!
    },
    logLevel: config.LOG_INFO
  })
}
