var gulp = require('gulp')
var browserify = require('browserify')
var reactify = require('reactify')
var source = require('vinyl-source-stream')

var paths = {
  browserify_entry: ['src/index.js'],
  js: ['src/js/**/*.js']
}

gulp.task('js', function(){
  return browserify(paths.browserify_entry)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('www/'))
})

gulp.task('watch', function(){
  return gulp.watch(paths.js, ['js'])
})

gulp.task('static', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('www/'))
})

gulp.task('default', ['js','static'])
