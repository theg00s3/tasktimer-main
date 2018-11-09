var commonConfig = require('./webpack-common.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha', 'sinon', 'sinon-chai', 'chai', 'phantomjs-shim'],
    files: [
      'test.webpack.js'
    ],
    preprocessors: {
      'test.webpack.js': ['webpack']
    },
    reporters: ['dots'],
    webpack: commonConfig,
    webpackServer: {
      noInfo: false
    },
    logLevel: config.LOG_INFO
  })
}
