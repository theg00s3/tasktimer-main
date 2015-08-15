var config = require('../config')
var gulp = require('gulp')
  , watchify = require('watchify')
  , gutil = require('gulp-util')

gulp.task('watch', ['watchify','default','browser-sync'], function() {
  gulp.watch(config.paths.test, ['test'])
  gulp.watch(config.paths.stylus, ['stylus'])
  gulp.watch(config.paths.jade, ['jade'])
  gulp.watch(config.paths.assets, ['assets'])
})