var store = require('store')
  , moment = require('moment')
  , PomodoroRepository = require('./PomodoroRepository')
  , AnalyticsService = require('./AnalyticsService')
  , PersistentQueue = require('./PersistentQueue')

var failedPomodoriKey = require('../constants').failedPomodoriKey
  , failedPomodoriQueue = new PersistentQueue(failedPomodoriKey)

module.exports = function(eventName, minutes, type, time){
  if( 'start' === eventName ) {
    handleStart()
  }
  if( 'end' === eventName ) {
    handleEnd()
  }
}

function handleStart(minutes, type){
  var pomodoroData = {
    minutes: minutes,
    type: type,
    startedAt: new Date()
  }
  AnalyticsService.track('timer-start', pomodoroData)
  store.set('pomodoroData', pomodoroData)
}

function handleEnd(){
  var pomodoroData = store.get('pomodoroData')
  if( pomodoroData && pomodoroData.minutes && pomodoroData.startedAt ){
    pomodoroData = setCancelledAtIfNeeded(pomodoroData)
    AnalyticsService.track('timer-end', pomodoroData)
    PomodoroRepository.create(pomodoroData)
    .catch(function(){
      failedPomodoriQueue.push(pomodoroData)
    })
  }
  store.remove('pomodoroData')

}

function setCancelledAtIfNeeded(pomodoroData){
  var now = Date.now()
  var startedAt = moment(pomodoroData.startedAt).unix()*1000
  if( (now - startedAt)/60/1000 < pomodoroData.minutes ){
    pomodoroData.cancelledAt = now
  }
  return pomodoroData
}
