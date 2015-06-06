var gulp = require('gulp')
  , browserSync = require('browser-sync').create()
  , plumber = require('gulp-plumber')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , jade = require('gulp-jade')
  , mocha = require('gulp-mocha')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , source = require('vinyl-source-stream')

var paths = {
  js: ['src/**/*.js'],
  stylus: ['src/**/*.styl'],
  jade: ['src/**/*.jade'],
  test: ['test/**/*.js']
}

var entryFiles = {
  browserify: 'src/index.js',
  stylus: 'src/index.styl',
  jade: 'src/index.jade',
}

gulp.task('js', function(){
  return browserify({
      entries:entryFiles.browserify,
      debug: true
    })
    .transform(reactify)
    .bundle()
    .pipe(plumber())
    .pipe(source('index.js'))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream())
})

gulp.task('stylus', function(){
  return gulp.src(entryFiles.stylus)
    .pipe(stylus({use: [nib()]}))
    .pipe(plumber())
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream())
})

gulp.task('jade', function(){
  return gulp.src(entryFiles.jade)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream())
})

gulp.task('test', function(){
  return gulp.src('test/unit/**/*.js', {read: false})
    .pipe(plumber())
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'dot', bail:true}))
})

gulp.task('browser-sync', function(){
  browserSync.init({
      proxy: 'https://pomodoro.dev'
  });
})

gulp.task('watch', ['default', 'browser-sync'], function(){
  gulp.watch(paths.js, ['js','test'])
  gulp.watch(paths.test, ['test'])
  gulp.watch(paths.stylus, ['stylus'])
  gulp.watch(paths.jade, ['jade'])
  gulp.watch('src/index.html', ['static'])
})

gulp.task('static', function(){
  gulp.src('src/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('www/'))
  gulp.src('./src/assets/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('www/assets/'))
})

gulp.task('default', ['js','stylus','test','jade','static'])
