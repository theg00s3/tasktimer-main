var gulp = require('gulp')
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
  return browserify(entryFiles.browserify)
    .transform(reactify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('www/'))
})

gulp.task('stylus', function(){
  return gulp.src(entryFiles.stylus)
    .pipe(stylus({use: [nib()]}))
    .on('error',function(){console.log('stylus::ERROR'); return this})
    .pipe(gulp.dest('www/'))
})

gulp.task('jade', function(){
  return gulp.src(entryFiles.jade)
    .pipe(jade())
    .pipe(gulp.dest('www/'))
})

gulp.task('test', function(){
  return gulp.src('test/unit/**/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'nyan', bail:true}))
})

gulp.task('watch', ['default'], function(){
  gulp.watch(paths.js, ['js','test'])
  gulp.watch(paths.test, ['test'])
  gulp.watch(paths.stylus, ['stylus'])
  gulp.watch(paths.jade, ['jade'])
  gulp.watch('src/index.html', ['static'])
})

gulp.task('static', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('www/'))
})

gulp.task('default', ['js','stylus','test','jade','static'])
