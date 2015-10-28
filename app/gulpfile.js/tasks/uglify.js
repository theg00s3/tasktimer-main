var gulp = require('gulp')
  , uglify = require('gulp-uglify')

gulp.task('uglify', function(){
  return gulp.src('./www/index.js', {base:'./'})
    .pipe(uglify())
    .pipe(gulp.dest('./'))
})