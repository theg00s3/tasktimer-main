module.exports = {
  track: registerEvent('track'),
  identify: registerEvent('identify'),
  page: registerEvent('page'),
}

function registerEvent(eventName){
  return function(){
    if( window.analytics && window.analytics[eventName] )
      window.analytics[eventName].apply(null, arguments)
  }
}
