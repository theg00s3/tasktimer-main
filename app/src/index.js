var React = require('react')
var page = require('page')
var router = require('./router')
var logger = require('./modules/Logger')
var appCache = require('./modules/appCache')

logger.enable( !/pomodoro\.cc/.test(window.location.host) )

router.start()

var Header = require('./components/Header')
var Footer = require('./components/Footer')

React.render(<Header/>, document.getElementById('main-header'))
React.render(<Footer/>, document.getElementById('main-footer'))

appCache.onUpdateReady(function(){
  appCache.doSwapCache()
  if( window.location ){
    window.location.reload()
  }
})

require('./init/auth')()
