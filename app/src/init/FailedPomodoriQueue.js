var PersistentQueue = require('../modules/PersistentQueue')
var PomodoroRepository = require('../modules/PomodoroRepository')
var failedPomodoriKey = require('../constants').failedPomodoriKey
var failedPomodoriQueue = new PersistentQueue(failedPomodoriKey)

module.exports = function(){
  trySaveFailedPomodori()
  setInterval(function(){
    if( failedPomodoriQueue.hasItems() ){
      trySaveFailedPomodori()
    }
  }, 1 * 1000 * 60)
}

function trySaveFailedPomodori(){
  var savingFailed = false
  while( !savingFailed && failedPomodoriQueue.hasItems() ){
    var pomodoro = failedPomodoriQueue.pop()
    PomodoroRepository.create(pomodoro)
    .catch(function(){
      failedPomodoriQueue.push(pomodoro)
      savingFailed = true
    })
  }
}