module.exports = function(config) {
  config.set({
    basePath: '',

    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify','mocha'],

    files: [
      'src/**/*.test.js'
    ],

    exclude: [
    ],

    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.test.js': ['browserify']
    },

    browserify: {
      debug: true,
      extensions: ['.js']
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    singleRun: false,

    browserNoActivityTimeout: 30000
  })
}