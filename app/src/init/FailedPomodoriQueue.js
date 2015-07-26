var PersistentQueue = require('../modules/PersistentQueue')
var PomodoroRepository = require('../modules/PomodoroRepository')
var failedPomodoriQueue = new PersistentQueue('failedPomodori')

module.exports = function(){
  setInterval(function(){
    if( failedPomodoriQueue.hasItems() ){
      var pomodoro = failedPomodoriQueue.pop()
      PomodoroRepository.create(pomodoro)
      .catch(function(){
        failedPomodoriQueue.push(pomodoro)
      })
    }
  }, 5 * 1000)
}