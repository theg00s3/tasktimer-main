var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , replace = require('gulp-replace')
  , stylus = require('gulp-stylus')
  , gutil = require('gulp-util')
  , jade = require('gulp-jade')
  , mocha = require('gulp-mocha')
  , gulpif = require('gulp-if')
  , browserSync = require('browser-sync').create()
  , historyApiFallback = require('connect-history-api-fallback')
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
var NO_BROWSER = !!process.env.NO_BROWSER
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

var bundler = browserify({
      entries: entryFile.browserify,
      insertGlobals: false,
      debug: false,
      // watchify requires these options
      cache: {}, packageCache: {}, fullPaths: true
    })
bundler.transform(reactify)

gulp.task('default', ['js','stylus','jade','assets'])

gulp.task('watch', ['browser-sync', 'default'], function(){
  bundler = watchify(bundler)
  bundler.on('update', bundle)
  gulp.watch(paths.js, ['js','test'])
  gulp.watch(paths.test, ['test'])
  gulp.watch(paths.stylus, ['stylus'])
  gulp.watch(paths.jade, ['jade'])
  gulp.watch(paths.assets, ['assets'])
})


function bundle(){
  return bundler.bundle()
    // log errors if they happen
    .on('error', function(err){
      gutil.log('Browserify Error')
      gutil.log(err.message)
      this.emit('end')
    })
    .pipe(source('index.js'))
    // // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(gulpif(PRODUCTION, uglify()))
    .pipe(gulp.dest('./www'))
    .pipe(browserSync.stream())
}

gulp.task('js', bundle)
bundler.on('log', gutil.log)


gulp.task('stylus', function(){
  return gulp.src(entryFile.stylus)
    .on('error', function(){
      gutil.log('stylus Error')
      this.emit('end')
    })
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
  gulp.watch(paths.js, ['test'])
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
  if( NO_BROWSER ){
    browsers = []
  }
  browserSync.init({
    server: {
      baseDir: 'www'
    },
    middleware: [ historyApiFallback() ],
    port: 9001,
    ui: false,
    browser: browsers
  });
})


gulp.task('assets', function(){
  gulp.src('src/favicon.ico')
    .pipe(gulp.dest('www/'))
  gulp.src(paths.assets)
    .pipe(plumber())
    .pipe(gulp.dest('www/assets/'))
})
