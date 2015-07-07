var constants = require('../constants')
module.exports = function(store){
  var settings = store.get(constants.tickingSoundKey)
  return function(key, value){
    if( key === 'tick' ){
      store.set(constants.tickingSoundKey, value)
    }
  }
}
