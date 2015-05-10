angular.module('app')
.service('TimeFormatter', function(){
  var self = this

  self.pad = function(number){
    return (number<10) ? ('0'+number) : (''+number)
  }

  self.formatSeconds = function(seconds){
    if(seconds<0){
      return '00:00'
    }
    var minutes = parseInt(seconds/60,10)
    var secondsRemainder = parseInt(seconds%60,10)
    return self.pad(minutes) + ':' + self.pad(secondsRemainder)
  }

  self.formatTime = function(ms){
    return moment(ms).format('HH:mm')
  }
})
