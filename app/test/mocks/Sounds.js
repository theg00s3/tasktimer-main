beforeEach(module('app', function($provide){
  $provide.decorator('Sounds', function(){
    this.load=this.play=this.playLoop=this.stop=angular.noop
    return this
  })
}))