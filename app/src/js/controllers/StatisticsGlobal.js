angular.module('app')
.controller('StatisticsGlobalCtrl', function($http){
  var vm = this

  $http.get('/api/statistics')
  .then(function(response){
    vm.statistics = response.data
    console.log( 'then', vm.statistics )
  })
  .catch(function(){
    console.log( 'catch', arguments )
  })

})
