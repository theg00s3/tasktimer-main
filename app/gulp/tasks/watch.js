var config = require('../config')
var gulp = require('gulp')
  , watchify = require('watchify')
  , gutil = require('gulp-util')

var browserifyTask = require('./browserify')

gulp.task('watch', ['browser-sync'], function() {
  browserifyTask(true)
  gulp.watch(config.paths.test, ['test'])
  gulp.watch(config.paths.stylus, ['stylus'])
  gulp.watch(config.paths.jade, ['jade'])
  gulp.watch(config.paths.assets, ['assets'])
})