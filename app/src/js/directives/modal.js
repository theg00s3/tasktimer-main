angular.module('app')
.directive('modal', function(Modal){
  return {
    scope: {
      name: '@'
    },
    restrict: 'E',
    template: [
      '<div class="modal" ng-show="visible" ng-class=\'{"visible":visible}\'>',
        '<div class="modal-overlay" ng-click="hide()"></div>',
        '<div class="modal-dialog" ng-style="dialogStyle">',
          '<i class="modal-close ion-ios7-close-outline" ng-click="hide()"></i>',
          '<div class="modal-dialog-content"ng-transclude></div>',
        '</div>',
      '</div>'
    ].join(''),
    transclude: true,
    link: function($scope, iElm, iAttrs, controller) {
      $scope.visible = false
      $scope.hide = function() {
        Modal.hide($scope.name)
      }
      Modal.changes($scope.name,function(showing){
        $scope.visible = showing
      })
    }
  }
})