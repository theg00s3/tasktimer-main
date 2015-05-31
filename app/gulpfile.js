var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , source = require('vinyl-source-stream')

var paths = {
  js: ['src/**/*.js'],
  stylus: ['src/**/*.styl']
}

var entryFiles = {
  browserify: 'src/index.js',
  stylus: 'src/index.styl'
}

gulp.task('js', function(){
  return browserify(entryFiles.browserify)
    .transform(reactify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('www/'))
})

gulp.task('stylus', function(){
  return gulp.src(entryFiles.stylus)
    .pipe( stylus({use: [nib()]}))
    .on('error',function(){console.log('stylus::ERROR'); return this})
    .pipe(gulp.dest('www/'))
})


gulp.task('watch', ['default'], function(){
  gulp.watch(paths.js, ['js'])
  gulp.watch(paths.stylus, ['stylus'])
})

gulp.task('static', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('www/'))
})

gulp.task('default', ['js','stylus','static'])
