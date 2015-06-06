var gulp = require('gulp')
  , browserSync = require('browser-sync').create()
  , plumber = require('gulp-plumber')
  , replace = require('gulp-replace')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , jade = require('gulp-jade')
  , mocha = require('gulp-mocha')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , source = require('vinyl-source-stream')

require('shelljs/global')
var PRODUCTION = !!process.env.PRODUCTION
var BUILD = exec('git rev-parse HEAD').output.toString().substring(0,10) || Date.now()

console.log('-- PRODUCTION', PRODUCTION)
console.log('-- BUILD', BUILD)

var paths = {
  js: ['src/**/*.js'],
  stylus: ['src/**/*.styl'],
  jade: ['src/**/*.jade'],
  test: ['test/**/*.js'],
  static: ['./src/index.html','./src/app.manifest','./src/assets/**/*']
}

var entryFile = {
  browserify: 'src/index.js',
  stylus: 'src/index.styl',
  jade: 'src/index.jade',
}

gulp.task('js', function(){
  return browserify({
      entries:entryFile.browserify,
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
  return gulp.src(entryFile.stylus)
    .pipe(stylus({use: [nib()]}))
    .pipe(plumber())
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream())
})

gulp.task('jade', function(){
  return gulp.src(entryFile.jade)
    .pipe(plumber())
    .pipe(jade({
      locals: {
        PRODUCTION: PRODUCTION
      }
    }))
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
  gulp.watch(paths.static, ['static'])
})

gulp.task('static', function(){
  gulp.src('./src/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('www/'))
  gulp.src('./src/app.manifest')
    .pipe(plumber())
    .pipe(replace('{BUILD}', BUILD))
    .pipe(gulp.dest('www/'))
  gulp.src(paths.static)
    .pipe(plumber())
    .pipe(gulp.dest('www/assets/'))
})

gulp.task('default', ['js','stylus','test','jade','static'])
