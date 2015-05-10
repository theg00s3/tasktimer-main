angular.module('app')
.directive('histogram', function(){
  return {
    scope: {
      graph: '='
    },
    restrict: 'E',
    templateUrl: 'histogram.html',
    replace: true
  }
})