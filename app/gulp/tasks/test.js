var config = require('../config')
var gulp = require('gulp')
var mocha = require('gulp-mocha')

function test(){
  return gulp.src(config.paths.test, {read: false})
    .pipe(mocha({reporter: 'dot', bail:true}))
}

gulp.task('test', test)
