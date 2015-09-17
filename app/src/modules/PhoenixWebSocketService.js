var PhoenixWebSocketService = {
  initialize: initialize,
  destroy: destroy,
  join: join,
  send: send
}

function initialize(host, endpoint, WebSocketConstructor){
  host = host || location.host
  endpoint = endpoint || '/ws/socket/websocket'
  WebSocketConstructor = WebSocketConstructor || window.WebSocket
  if( typeof WebSocketConstructor === undefined ) {
    return {}
  }
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
  socket._channel = channel
  socket._topic = topic
  socketSend(socket, JSON.stringify({
    topic: channel+':'+topic,
    event: 'phx_join',
    payload: {},
    ref: 0
  }))
  return socket
}

function send(socket, event, payload){
  socketSend(socket, JSON.stringify({
    topic: socket._channel+':'+socket._topic,
    event: event,
    payload: payload,
    ref: 0
  }))
  return socket
}

module.exports = PhoenixWebSocketService

function socketSend(socket, data){
  if( !socket || !socket.send ) {
    return
  }
  // debugger
  console.log( '-- socket.OPEN', socket.OPEN )
  console.log( '-- socket.CONNECTING', socket.CONNECTING )
  console.log( '-- socket.readyState', socket.readyState )
  if( socket.readyState === 1 ){
    socket.send(data)
    return
  }
  setTimeout(function(){
    socketSend(socket, data)
  }, 100)
}
