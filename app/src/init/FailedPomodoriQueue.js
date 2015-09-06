var PersistentQueue = require('../modules/PersistentQueue')
var PomodoroRepository = require('../modules/PomodoroRepository')
var AuthService = require('../modules/AuthService')
var failedPomodoriKey = require('../constants').failedPomodoriKey
var failedPomodoriQueue = new PersistentQueue(failedPomodoriKey)

module.exports = function(){
  AuthService.authenticate()
  .then(retryNextFailedPomodoro)
}

function retryNextFailedPomodoro(){
  if( failedPomodoriQueue.hasItems() ){
    var pomodoro = failedPomodoriQueue.pop()
    trySavedFailedPomodoro(pomodoro)
    .then(function(){
      setTimeout(retryNextFailedPomodoro, 500)
    })
  }
}

function trySavedFailedPomodoro(pomodoro){
  return PomodoroRepository.create(pomodoro)
  .catch(function(){
    failedPomodoriQueue.push(pomodoro)
  })
}