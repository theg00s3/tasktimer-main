var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , replace = require('gulp-replace')
  , stylus = require('gulp-stylus')
  , gutil = require('gulp-util')
  , jade = require('gulp-jade')
  , mocha = require('gulp-mocha')
  , gulpif = require('gulp-if')
  , browserSync = require('browser-sync').create()
  , uglify = require('gulp-uglify')
  , nib = require('nib')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , reactify = require('reactify')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')


require('shelljs/global')
var PRODUCTION = !!process.env.PRODUCTION
var CROSS_BROWSER = !!process.env.CROSS_BROWSER
var BUILD = exec('git rev-parse HEAD').output.toString().substring(0,10) || Date.now()

console.log('-- PRODUCTION', PRODUCTION)
console.log('-- BUILD', BUILD)

var paths = {
  js: ['src/**/*.js'],
  stylus: ['src/**/*.styl'],
  jade: ['src/**/*.jade'],
  test: ['src/**/*.test.js'],
  assets: ['src/assets/**/*']
}

var entryFile = {
  browserify: 'src/index.js',
  stylus: 'src/index.styl',
  jade: 'src/index.jade',
}

var b = browserify({
      entries: entryFile.browserify,
      insertGlobals: false
    })
b.transform(reactify)

gulp.task('default', ['js','stylus','test','jade','assets'])

gulp.task('watch', ['browser-sync', 'default'], function(){
  b = watchify(browserify({
        entries: entryFile.browserify,
        insertGlobals: false
      }))
  b.transform(reactify)
  gulp.watch(paths.js, ['js','test'])
  gulp.watch(paths.test, ['test'])
  gulp.watch(paths.stylus, ['stylus'])
  gulp.watch(paths.jade, ['jade'])
  gulp.watch(paths.assets, ['assets'])
})


function bundle(){
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('index.js'))
    // // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(gulpif(PRODUCTION, uglify()))
    .pipe(gulp.dest('./www'))
    .pipe(browserSync.stream())
}

gulp.task('js', bundle) // so you can run `gulp js` to build the file
b.on('update', bundle) // on any dep update, runs the bundler
b.on('log', gutil.log) // output build logs to terminal


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
    .pipe(replace('{SEGMENT_WRITE_KEY}', PRODUCTION ? 'DI4YQLtpCkiyMnlITlg8o3pO6UDrnmbx' : 'u8FtwJOHxRRYAfIhZOv78SGzcQta1Yty'))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream())
})

gulp.task('test-watch', function(){
  gulp.watch(paths.test, ['test'])
})

gulp.task('test', function(){
  return gulp.src(paths.test, {read: false})
    // .pipe(plumber())
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'dot', bail:true}))
})

gulp.task('browser-sync', function(){
  var browsers = ['google chrome']
  if( CROSS_BROWSER ){
    browsers.push('firefox')
    browsers.push('safari')
  }
  browserSync.init({
    server: {
      baseDir: 'www'
    },
    port: 9001,
    ui: false,
    browser: browsers
  });
})


gulp.task('assets', function(){
  gulp.src('src/app.manifest')
    .pipe(plumber())
    .pipe(replace('{BUILD}', BUILD))
    .pipe(gulp.dest('www/'))
  gulp.src(paths.assets)
    .pipe(plumber())
    .pipe(gulp.dest('www/assets/'))
})
