angular.module('app')
.service('landingPageRedirect',function($rootScope,$location){
  var landed = !!localStorage.getItem('landed')
  $rootScope.$on('$stateChangeStart', function(event,toState,toParams,fromState,fromParams){
    if(landed){
      return
    }
    if( 'dashboard' === toState.name ){
      $location.path('/about')
      landed = true
      localStorage.setItem('landed',landed)
    }
  })
})
