var appCache = window.applicationCache

module.exports = {
  onUpdateReady:onUpdateReady,
  doSwapCache: doSwapCache
}

function onUpdateReady(callback){
  if( appCache ){
    try {
      appCache.addEventListener('updateready', function(e) {
        callback(appCache)
      })
    } catch(e){}
  }

}
function doSwapCache(){
  if( appCache ){
    appCache.swapCache()
  }
}
