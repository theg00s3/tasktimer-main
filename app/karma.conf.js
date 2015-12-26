var commonConfig = require('./webpack-common.config.js')();
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha', 'sinon','sinon-chai', 'chai','phantomjs-shim'],
    files: [
      'test.webpack.js' //just load this file
    ],
    preprocessors: {
      'test.webpack.js': [ 'webpack' ]
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: commonConfig.loaders
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    logLevel: config.LOG_INFO,
  });
};
