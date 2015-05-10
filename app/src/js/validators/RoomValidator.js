angular.module('app')
.service('RoomValidator', function(){
  var self = this
  self.validate = function(room){
    return room && /^[a-zA-Z0-9-_]*$/.test(room) && room.indexOf(' ') < 0
  }
})
