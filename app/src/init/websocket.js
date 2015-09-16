var PhoenixWebSocketService = require('../modules/PhoenixWebSocketService')

module.exports = function(){
  var socket = PhoenixWebSocketService.initialize()
  window.socket = socket

  socket.onmessage = function(message){
    console.log( '-- socket.onmessage', message.data )
  }

  PhoenixWebSocketService.join(socket, 'global', 'pomodoro_event')
  PhoenixWebSocketService.send(socket, 'pomodoro_start', {data: 'whaaa'})
}
