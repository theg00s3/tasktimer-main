var config = require('../config')
var gulp = require('gulp')
  , gutil = require('gulp-util')
  , gulpif = require('gulp-if')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , watchify = require('watchify')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , uglify = require('gulp-uglify')
  , browserSync = require('browser-sync')

var PRODUCTION = !!process.env.PRODUCTION
var dev = false
var browserifyStream = browserify({
      entries: config.entryFiles.browserify,
      insertGlobals: false,
      debug: !PRODUCTION,
      // watchify requires these options
      cache: {}, packageCache: {}, fullPaths: true
    })
// browserifyStream.external('react')
browserifyStream.transform(reactify)


function task(_dev){
  if( typeof _dev !== 'function' ){
    dev = _dev
  }

  if( dev ){
    browserifyStream = watchify(browserifyStream)
    browserifyStream.on('update', bundle)
  }
  browserifyStream.on('log', gutil.log)
  return bundle()
}

function bundle(){
  return browserifyStream.bundle()
    .on('error', function(err){
      gutil.log('Browserify Error')
      gutil.log(err.message)
      this.emit('end')
      if( PRODUCTION ){throw err}
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulpif(PRODUCTION, uglify()))
    .pipe(gulp.dest(config.paths.dest))
    .pipe(browserSync.reload({stream:true}))
}
gulp.task('browserify', task)

module.exports = task