var PersistentQueue = require('../modules/PersistentQueue')
var PomodoroRepository = require('../modules/PomodoroRepository')
var failedPomodoriKey = require('../constants').failedPomodoriKey
var failedPomodoriQueue = new PersistentQueue(failedPomodoriKey)

module.exports = function(){
  retryNextFailedPomodoro()
}

function retryNextFailedPomodoro(){
  if( failedPomodoriQueue.hasItems() ){
    var pomodoro = failedPomodoriQueue.pop()
    trySavedFailedPomodoro(pomodoro)
    .then(retryNextFailedPomodoro)
  }
}

function trySavedFailedPomodoro(pomodoro){
  return PomodoroRepository.create(pomodoro)
  .catch(function(){
    failedPomodoriQueue.push(pomodoro)
  })
}