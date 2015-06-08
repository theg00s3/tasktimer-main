var React = require('react')
var page = require('page')
var router = require('./router')
var AuthService = require('./modules/AuthService')
var AnalyticsService = require('./modules/AnalyticsService')
var logger = require('./modules/Logger')
var appCache = require('./modules/appCache')

logger.enable( /pomodoro\.dev/.test(window.location.host) )

router.start()

var Header = require('./components/Header')

React.render(<Header/>, document.getElementById('main-header'))

AuthService.authenticate()
.then(function(response){
  var user = response.data
  AnalyticsService.identify(user.id, {
    username: user.username
  })
})
.catch(function(){})

AnalyticsService.track('test')

appCache.onUpdateReady(function(){
  appCache.doSwapCache()
  if( window.location ){
    window.location.reload()
  }
})

