var appCache = require('./modules/appCache')

module.exports = function(){
  appCache.onUpdateReady(function(){
    appCache.doSwapCache()
    if( window.location ){
      window.location.reload()
    }
  })
}
