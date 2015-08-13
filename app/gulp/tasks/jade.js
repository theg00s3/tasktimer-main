var config = require('../config')
var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , replace = require('gulp-replace')
  , jade = require('gulp-jade')
  , browserSync = require('browser-sync')

require('shelljs/global')
var PRODUCTION = !!process.env.PRODUCTION
var BUILD = exec('git rev-parse HEAD').output.toString().substring(0,10) || Date.now()

gulp.task('jade', function(){
  return gulp.src(config.entryFiles.jade)
    .pipe(plumber())
    .pipe(jade({
      locals: {
        PRODUCTION: PRODUCTION
      }
    }))
    .pipe(replace('{SEGMENT_WRITE_KEY}', PRODUCTION ? 'DI4YQLtpCkiyMnlITlg8o3pO6UDrnmbx' : 'u8FtwJOHxRRYAfIhZOv78SGzcQta1Yty'))
    .pipe(replace('{BUILD}', BUILD))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.reload({stream:true}))
})