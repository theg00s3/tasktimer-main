var TimeFormatter = require('./TimeFormatter')
var constants = require('../../../shared/constants')

module.exports = {
  execute: function(remaining){
    if( remaining === 0 ){
      document.title = constants.title    
      return
    }
    var time = TimeFormatter.formatSeconds(remaining)
    document.title = time + ' - ' + constants.title
  }
}
