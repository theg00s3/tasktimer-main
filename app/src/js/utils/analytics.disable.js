angular.module('app')
.config(function($provide){
  $provide.decorator('$analytics', function($delegate) {
    $delegate.eventTrack = angular.noop
    return $delegate
  })
})
