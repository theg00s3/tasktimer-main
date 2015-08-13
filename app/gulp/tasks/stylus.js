var config = require('../config')
var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , browserSync = require('browser-sync')

gulp.task('stylus', function(){
  return gulp.src(config.entryFiles.stylus)
    .on('error', function(){
      gutil.log('stylus Error')
      this.emit('end')
    })
    .pipe(stylus({use: [nib()]}))
    .pipe(plumber())
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.reload({stream:true}))
})
