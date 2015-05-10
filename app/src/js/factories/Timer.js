angular.module('app')
.factory('Timer', function($rootScope,$interval,TimeFormatter){
  return function Timer(){
    var self = this

    var _remainingSeconds = 0
      , _remainingTime = null
      , _intervalHandle = null
      , _lastInterval = null
      , _callbacks = {
          tick:angular.noop,
          finish:angular.noop,
          stop:angular.noop
        }

    constructor.apply(self,arguments)

    function constructor(seconds){
      if( !isValidSeconds(seconds) ){ throw new Error('-- Timer -- invalid seconds ('+ seconds +')') }
      _remainingSeconds = seconds
      intervalCallback()
      _intervalHandle = $interval(intervalCallback,1000)
    }

    self.on = function(name, operation){
      _callbacks[name] = angular.isFunction(operation) ?
        operation : angular.noop
      if( 'tick'===name ){
        intervalCallback()
      }
      return self
    }

    self.stop = function(){
      $interval.cancel(_intervalHandle)
      _callbacks.stop()
      _remainingSeconds = 0
      $rootScope.remainingTime = '00:00'
    }

    self.inProgress = function(){
      return _remainingSeconds > 0
    }

    self.getRemainingTime = function(){
      return TimeFormatter.formatSeconds(_remainingSeconds)
    }

    function intervalCallback(){
      _remainingSeconds = adjustRemainingSeconds()
      _remainingTime = TimeFormatter.formatSeconds(_remainingSeconds)
      $rootScope.remainingTime = _remainingTime
      _callbacks.tick(_remainingTime,_remainingSeconds)
      _lastInterval = Date.now()
      if( isFinished() ){
        $interval.cancel(_intervalHandle)
        return _callbacks.finish()
      }
    }

    function adjustRemainingSeconds(){
      if( _lastInterval === null ){return _remainingSeconds}
      var tmpLastInterval = _lastInterval
      _lastInterval = Date.now()
      return Math.round((_remainingSeconds*1000 - (_lastInterval - tmpLastInterval))/1000)
    }

    function isValidSeconds(seconds){
      return seconds === parseInt(seconds,10) && seconds > 0
    }

    function isFinished(){
      return _remainingSeconds === 0
    }
  }
})
