module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      /* libs */
      'www/js/vendor.js',
      'www/js/app.js',
      'www/js/templates.js',
      'src/lib/angular-mocks/angular-mocks.js',

      /* mocks */
      'test/mocks/*.js',

      /* unit tests */
      'test/unit/**/*.spec.js',
    ],

    exclude: [],
    preprocessors: {},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['growl','mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
}
