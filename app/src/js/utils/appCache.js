/* need this for ngAnnotate :( */
angular.module('app')
.service('appCache', function(){})

var appCache = window.applicationCache
if( appCache ){
  try {
    appCache.addEventListener('updateready', function(e) {
      console.log( '-- appCache updateReady', appCache.status )
      appCache.swapCache()
      location.reload()
    }, false)
    appCache.update()
  }catch(e){}
}
