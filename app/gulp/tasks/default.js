var gulp = require('gulp')

gulp.task('default', [
  'test',
  'browserify',
  'stylus',
  'jade',
  'assets',
])
