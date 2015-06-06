var track = registerEvent('track')
var identify = registerEvent('identify')
var page = registerEvent('page')

module.exports = {
  track: track,
  identify: identify,
  page: page,
}

function registerEvent(eventName){
  return function(){
    if( window.analytics && window.analytics[eventName] )
      window.analytics[eventName].apply(null, arguments)
  }
}
