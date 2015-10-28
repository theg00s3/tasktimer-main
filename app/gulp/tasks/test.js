var gulp = require('gulp')
var Server = require('karma').Server

gulp.task('test', function (done) {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done).start()
})


// var config = require('../config')
// var gulp = require('gulp')
// var karma = require('gulp-karma')

// var PRODUCTION = !!process.env.PRODUCTION

// function test(done){
//   return gulp.src(config.paths.test)
//     .pipe(karma({
//       configFile: process.cwd() + '/karma.conf.js',
//       action: 'run'
//     }))
//     .on('error', function(err) {
//       this.emit('end')
//       if( PRODUCTION ){throw err}
//     })
// }

// gulp.task('test', test)

module.exports = test
