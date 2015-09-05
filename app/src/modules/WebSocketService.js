var socket

var WebSocketService = {
  initialize: initialize,
  destroy: destroy,
  join: join,
  send: send
}

function initialize(host, endpoint, WebSocketConstructor){
  host = host || location.host
  endpoint = endpoint || '/ws/socket/websocket'
  WebSocketConstructor = WebSocketConstructor || WebSocket
  socket = new WebSocketConstructor('wss://'+host+endpoint)
  return socket
}

function destroy(){
  if( socket && socket.close ){
    socket.close()
    socket = undefined
  }
  return socket
}

function join(channel, topic){
  socket.send(JSON.stringify({
    topic: channel+':'+topic,
    event: 'phx_join',
    payload: {},
    ref: 0
  }))
  return socket
}
function send(message){
  socket.send(JSON.stringify({data:message}))
}

module.exports = WebSocketService
