var config = require('../config')
var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , historyApiFallback = require('connect-history-api-fallback')

var CROSS_BROWSER = !!process.env.CROSS_BROWSER
var NO_BROWSER = !!process.env.NO_BROWSER

gulp.task('browser-sync', function(){
  var browsers = ['google chrome']
  if( CROSS_BROWSER ){
    browsers.push('firefox')
    browsers.push('safari')
  }
  if( NO_BROWSER ){
    browsers = []
  }
  browserSync({
    server: {
      baseDir: 'www'
    },
    middleware: [ historyApiFallback() ],
    port: 9001,
    ui: false,
    browser: browsers
  });
})
