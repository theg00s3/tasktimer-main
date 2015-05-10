angular.module('app')
.service('rAf', function(){
  var self = this

  window.requestAnimationFrame =
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){ window.setTimeout(callback, 1000 / 60) }

  window.cancelAnimationFrame = window.cancelAnimationFrame ||
    function(id) { clearTimeout(id) }
  
  self.start = window.requestAnimationFrame.bind(window)

  self.stop = window.cancelAnimationFrame.bind(window)

})