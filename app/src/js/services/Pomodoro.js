angular.module('app')
.service('Pomodoro', function(Timer,Tags,TimeValidator,Sounds,DataManager,PomodoroPersistence,Notifications,constants){
  var self = this

  Sounds.load('ticktick')
  Sounds.load('ring')

  var timer = null
  var pomodoroData = defaultPomodoroData()

  self.start = function(minutes,type){
    checkTimerAlreadyInProgress()
    validate(minutes,type)

    pomodoroData.minutes = minutes
    pomodoroData.type = type
    setCurrentPomodoroData()

    timer = new Timer(minutes*60)
    registerTimerCallbacks()
    Sounds.playLoop('ticktick',true)
  }

  self.restore = function(data){
    checkTimerAlreadyInProgress()
    var remainingSeconds = parseInt((moment(data.startedAt).unix()+data.minutes*60 - moment().unix()),10)
    validateRemainingSeconds(remainingSeconds)

    pomodoroData.minutes = data.minutes
    pomodoroData.type = data.type
    setCurrentPomodoroData()
    pomodoroData.tags.restore(data.tags)
    pomodoroData.distractions = data.distractions || []
    pomodoroData.startedAt = moment(data.startedAt)

    timer = new Timer(remainingSeconds)
    registerTimerCallbacks()
    Sounds.playLoop('ticktick',true)
  }

  self.stop = function(){
    pomodoroData.cancelledAt = moment()
    timer.stop()
  }

  self.recordDistraction = function(){
    if( timer && timer.inProgress() ){
      pomodoroData.distractions.push(Date.now())
    }
  }

  self.getDistractions = function(){
    return pomodoroData.distractions
  }

  self.getMinutes = function(){
    return pomodoroData.minutes
  }

  self.timer = function(){
    return timer
  }

  self.inProgress = function(){
    return timer && timer.inProgress()
  }

  self.getRemainingTime = function(){
    return timer ? timer.getRemainingTime() : '00:00'
  }

  self.getData = function(){
    return JSON.parse(JSON.stringify(pomodoroData))
  }

  self.getType = function(){
    return pomodoroData.type
  }

  self.getTags = function(){
    return pomodoroData.tags
  }

  self.reset = resetPomodoroData


  function defaultPomodoroData(){
    return {
      minutes: null,
      startedAt: null,
      type: null,
      tags: null,
      distractions: null,
    }
  }

  function timerEnded(){
    PomodoroPersistence.save(pomodoroData)
    DataManager.addPomodoro(pomodoroData)
    if( ['pomodoro','break'].indexOf(self.getType()) >= 0 ){
      DataManager.set('pomodoroRestoreData',null)
    }else{
      DataManager.set('pomodoroRestoreDataPublic',null)
    }

    pomodoroData = defaultPomodoroData()
    Notifications.createNotification('Pomodoro.cc','Timer ended!')
    Sounds.play('ring')
    Sounds.stop('ticktick')
  }

  function registerTimerCallbacks(){
    timer.on('tick', function(){
      if( ['pomodoro','break'].indexOf(self.getType()) >= 0 ){
        DataManager.set('pomodoroRestoreData',JSON.parse(JSON.stringify(pomodoroData)))
      }else{
        DataManager.set('pomodoroRestoreDataPublic',JSON.parse(JSON.stringify(pomodoroData)))
      }
    })
    timer.on('stop', timerEnded)
    timer.on('finish', timerEnded)
  }

  function setCurrentPomodoroData(){
    pomodoroData.startedAt = moment()
    pomodoroData.tags = new Tags()
    pomodoroData.distractions = []
  }

  function checkTimerAlreadyInProgress(){
    if( timer && timer.inProgress() ){
      throwTimerAlreadyInProgress()
    }
  }

  function validate(minutes,type){
    validateMinutes(minutes)
    validateType(type)
  }

  function validateMinutes(minutes){
    if( !TimeValidator.validateMinutes(minutes) ){
      throwInvalidArgument('minutes',minutes)
    }
  }

  function validateType(type){
    if( -1 === ['pomodoro','break','pomodoro-public','break-public'].indexOf(type) ){
      throwInvalidArgument('type',type)
    }
  }

  function validateRemainingSeconds(remainingSeconds){
    if( remainingSeconds < 0 ){
      throwInvalidArgument('remainingSeconds',remainingSeconds)
    }
  }

  function resetPomodoroData(){
    for(var key in pomodoroData){
      if( pomodoroData.hasOwnProperty(key) ){
        pomodoroData[key] = null
      }
    }
  }

  var signature = '-- Pomodoro -- '
  function throwInvalidArgument(name,value){
    throw new Error(signature + 'invalid '+ name +' ("'+ value +'")')
  }
  function throwTimerAlreadyInProgress(){
    throw new Error(signature + 'timer already in progress')
  }

})
