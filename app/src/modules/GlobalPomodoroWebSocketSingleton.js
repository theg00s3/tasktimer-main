module.exports = {
  getSocket: getSocket
}

var PhoenixWebSocketService = require('./PhoenixWebSocketService')
var socket = PhoenixWebSocketService.create()
PhoenixWebSocketService.join(socket, 'global', 'pomodoro_event')

function getSocket(){
  return socket
}
