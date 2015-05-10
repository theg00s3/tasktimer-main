angular.module('app')
.service('Tour', function(DataManager,$timeout){
  var self = this

  var tour = {}

  DataManager.get('tour').then(function(_tour){
    tour=_tour || {}
  })

  self.acknowledged = function(key){
    return tour && tour[key] !== undefined && tour[key]===true
  }

  self.acknowledge = function(key){
    tour[key] = true
    return DataManager.set('tour', tour)
  }

  self.reset = function(){
    DataManager.set('tour',{})
  }
})
