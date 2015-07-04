var TimerService = require('../modules/TimerService')
var Timer = require('../modules/Timer')
var DocumentTitleUpdateCommand = require('../modules/DocumentTitleUpdateCommand')

module.exports = function(){
  TimerService.start(Timer, DocumentTitleUpdateCommand)
}
