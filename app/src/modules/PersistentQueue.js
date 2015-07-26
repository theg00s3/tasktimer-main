var store = require('store')
module.exports = function PersistentQueue(name){
  if( !(this instanceof PersistentQueue) ){
    return new PersistentQueue(name)
  }

  this.push = function(item){
    var queue = getQueue()
    queue.push(item)
    setQueue(queue)
  }
  this.pop = function(){
    var queue = getQueue()
    var popped = queue.pop()
    setQueue(queue)
    return popped
  }
  this.hasItems = function(){
    var queue = getQueue()
    return queue.length > 0
  }

  function getQueue(){
    return store.get(name) || []
  }
  function setQueue(queue){
    return store.set(name, queue) || []
  }
}