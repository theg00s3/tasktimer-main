angular.module('app')
.directive('hint', function(Tour){
  return {
    scope: {
      'text': '@'
    },
    transclude:true,
    restrict: 'E',
    templateUrl: 'hint.html'
  }
})
