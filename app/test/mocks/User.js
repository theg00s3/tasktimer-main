beforeEach(module('app',function($provide){
  $provide.decorator('User', function($q){
    this.authenticate = function(){ return $q.defer().promise }
    return this
  })
}))