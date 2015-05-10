angular.module('app')
.run(function($rootScope,$anchorScroll){
  $rootScope.$on('$locationChangeStart', function(){
    $anchorScroll()
  })
})