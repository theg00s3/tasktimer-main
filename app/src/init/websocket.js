module.exports = function(){
  var socket = new WebSocket('wss://'+location.host+'/ws/socket/websocket')
  window.socket = socket

  socket.onmessage = function(message){
    console.log( '-- socket.onmessage', message.data )
  }

  socket.onopen = function(){
    socket.send(JSON.stringify({
      topic:'global:pomodoro_event',
      event: 'phx_join',
      payload: {},
      ref: 0
    }))

    socket.send(JSON.stringify({
      topic:'global:pomodoro_event',
      event: 'shout',
      payload: {data:'whaaaa'},
      ref: 0
    }))
  }
}