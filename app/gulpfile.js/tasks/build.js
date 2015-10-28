var gulp = require('gulp')

gulp.task('build', [
  'browserify',
  'stylus',
  'jade',
  'assets',
])
