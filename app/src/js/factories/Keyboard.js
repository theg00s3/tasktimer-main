angular.module('app')
.factory('Keyboard', function($rootScope){
  return function Keyboard(){
    var self = this

    var register = {}

    self.when = function(key, action){
      if( angular.isFunction(action) ){
        register[key] = action
      }
      return self
    }

    self.handle = function(key){
      if( register[key] ){
        $rootScope.$digest()
        register[key].apply(self,arguments)
      }
    }
  }
})