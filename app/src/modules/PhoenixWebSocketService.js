var PhoenixWebSocketService = {
  initialize: initialize,
  destroy: destroy,
  join: join,
  send: send
}

function initialize(host, endpoint, WebSocketConstructor){
  host = host || location.host
  endpoint = endpoint || '/ws/socket/websocket'
  WebSocketConstructor = WebSocketConstructor || WebSocket
  return new WebSocketConstructor('wss://'+host+endpoint)
}

function destroy(socket){
  if( socket && socket.close ){
    socket.close()
    socket = undefined
  }
  return socket
}

function join(socket, channel, topic){
  socket.send(JSON.stringify({
    topic: channel+':'+topic,
    event: 'phx_join',
    payload: {},
    ref: 0
  }))
  return socket
}
function send(socket, message){
  socket.send(JSON.stringify({data:message}))
}

module.exports = PhoenixWebSocketService
