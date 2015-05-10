var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , jshintStylish = require('jshint-stylish')
  , connect = require('gulp-connect')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , jade = require('gulp-jade')
  , rename = require('gulp-rename')
  , historyApiFallback = require('connect-history-api-fallback')
  , ngAnnotate = require('gulp-ng-annotate')
  , gulpif = require('gulp-if')
  , replace = require('gulp-replace')
  , templateCache = require('gulp-angular-templatecache')

var PRODUCTION = !!process.env.PRODUCTION

require('shelljs/global')

var build = exec('git rev-parse HEAD').output.toString().substring(0,10) || Date.now()

var entryFiles = {
  stylus: ['./src/stylus/main.styl'],
  ionicons: {
    fonts: './src/lib/ionicons/fonts/*'
  },
  libCss: ['./src/lib/ionicons/css/ionicons.min.css','./src/lib/animate.css/animate.min.css'],
}

var glob = {
  stylus: ['./src/stylus/**/*.styl'],
  js: {
    vendor: [
      './src/lib/angular/angular.min.js',
      './src/lib/angular-sanitize/angular-sanitize.min.js',
      './src/lib/angular-ui-router/release/angular-ui-router.min.js',
      './src/lib/localforage/dist/localforage.min.js',
      './src/lib/angular-localforage/dist/angular-localForage.min.js',
      './src/lib/angular-animate/angular-animate.min.js',
      './src/lib/angular-cookies/angular-cookies.min.js',
      './src/lib/angulartics/dist/angulartics.min.js',
      './src/lib/angulartics/dist/angulartics-ga.min.js',
      './src/lib/angulartics/dist/angulartics-mixpanel.min.js',
      './src/lib/angular-resource/angular-resource.min.js',
      './src/lib/cf-socket-io/dest/cf-socket-io.min.js',
      './src/lib/moment/min/moment.min.js',
      './src/lib/underscore/underscore-min.js',
      './src/lib/angular-inview/angular-inview.js',
      './src/lib/HTML5-Desktop-Notifications/desktop-notify-min.js',
      './src/lib/loadScript.js',
      './src/js/vendor/**/*.js',
    ],
    custom: [
      './src/js/**/*.js',
      '!./src/js/vendor/**/*.js',
      '!./src/js/utils/analytics.disable.js',
    ]
  },
  jade: [
    './src/jade/index.jade',
  ],
  jade_mixins: [
    './src/jade/mixins/**/*.jade',
  ],
  templateCache: [
    './src/jade/partials/**/*.jade',
    './src/jade/directives/**/*.jade',
  ],
  seo: ['./src/sitemap.xml','./src/robots.txt'],
  appCache: ['./src/app.manifest'],
  assets: ['./src/assets/**/*'],
  favicon: ['./src/favicon.png'],
  build: ['./www/js/constants.js','./www/app.manifest']
}

if( !PRODUCTION ){
  glob.js.custom.pop()
  glob.js.custom.push('./src/js/')
}

gulp.task('default', ['stylus','lib:css','ionicons:fonts','js:vendor','js:custom','templateCache','jade','seo','appCache','assets','favicon','sign-build'])

gulp.task('watch', ['default'], function() {
  gulp.watch(glob.stylus, ['stylus'])
  gulp.watch(glob.js.custom, ['js:custom'])
  gulp.watch(glob.jade, ['jade'])
  gulp.watch(glob.jade_mixins, ['jade','templateCache'])
  gulp.watch(glob.templateCache, ['templateCache'])
  gulp.watch(glob.build, ['sign-build'])
})

gulp.task('watch-connect', ['watch','connect'], function(){})

gulp.task('connect',function(){
  connect.server({
    root: 'www',
    // livereload: true,
    port: process.env.PORT || 9000,
    // middleware: function(connect, opt) {
    //   return [ historyApiFallback ]
    // }
  })
})

gulp.task('assets', function(){
  return gulp.src(glob.assets)
    .pipe(gulp.dest('./www/assets/'))
    .pipe(connect.reload())
})

gulp.task('stylus', function(){
  return gulp.src(entryFiles.stylus)
    .pipe( stylus({use: [nib()]}))
    .pipe(gulp.dest('./www/css/'))
    .pipe(connect.reload())
    .on('error',function(){console.log('stylus::ERROR')})
})

gulp.task('ionicons:fonts',function(){
  return gulp.src(entryFiles.ionicons.fonts)
    .pipe(gulp.dest('./www/fonts/'))
})

gulp.task('lib:css',function(){
  return gulp.src(entryFiles.libCss)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./www/css/'))
})

gulp.task('jade', function(){
  return gulp.src(glob.jade)
    .pipe(gulpif(!PRODUCTION, replace(/\/\/- PRODUCTION[.\s\S]+\/\/- \/PRODUCTION/g, '')))
    .pipe(jade({
      locals: {
        PRODUCTION: PRODUCTION
      }
    }))
    .pipe(replace('{build}',build))
    .pipe(gulp.dest('./www/'))
    .pipe(connect.reload())
})

gulp.task('templateCache', function(){
  return gulp.src(glob.templateCache)
    .pipe(jade())
    .pipe(templateCache({module:'app'}))
    .pipe(gulp.dest('./www/js/'))
    .pipe(connect.reload())
    .on('error',function(){console.log('templateCache::ERROR')})
})

gulp.task('js:vendor', function(){
  return gulp.src(glob.js.vendor)
    .pipe(ngAnnotate())
    .pipe(uglify({mangle: true,compress:true}))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./www/js/'))
    .pipe(connect.reload())
})
gulp.task('js:custom', function(){
  return gulp.src(glob.js.custom)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish))
    .pipe(ngAnnotate())
    // .pipe(gulpif(PRODUCTION, uglify({mangle: PRODUCTION,compress:PRODUCTION})))
    .pipe(replace('{production}',PRODUCTION))
    .pipe(replace('{build}',build))
    .pipe(replace('{host}',PRODUCTION ? 'https://pomodoro.cc' : 'http://pomodoro.dev'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js/'))
    .pipe(connect.reload())
    .on('error',function(){console.log('js:custom::ERROR')})
})

gulp.task('sign-build', function(){
  return gulp.src(glob.build)
    .pipe(replace('{build}',build))
    .pipe(gulp.dest('./www/'))
})

gulp.task('seo',moveToWWW(glob.seo))
gulp.task('appCache',moveToWWW(glob.appCache))
gulp.task('favicon',moveToWWW(glob.favicon))

function moveToWWW(glob){
  return function(){
   return gulp.src(glob)
    .pipe(gulp.dest('./www/'))
  }
}
