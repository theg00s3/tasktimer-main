beforeEach(module('app',function($provide){
  $provide.service('rAf', function($q){
    this.start = this.stop = function(){}
  })
}))