angular.module('app')
.service('DataManager', function($q,$localForage,PomodoroValidator){
  var self = this

  self.normalize = function(key,normalized){
    return $localForage.getItem(key).then(function(unnormalized){
      normalized = unnormalized || normalized
      return $localForage.setItem(key,normalized)
    })
  }

  self.get = function(key){
    return $localForage.getItem(key)
  }

  self.set = function(key,value){
    return $localForage.setItem(key,value)
  }

  self.addTo = function(collectionName,data){
    return $localForage.getItem(collectionName).then(function(collection){
      if( !(collection instanceof Array) ){
        collection = []
      }
      collection.push(JSON.parse(JSON.stringify(data)))
      return $localForage.setItem(collectionName,collection)
    })
  }

  self.popFrom = function(collectionName){
    var deferred = $q.defer()
    return $localForage.getItem(collectionName).then(function(collection){
      var item
      if( !(collection instanceof Array) || collection.length === 0 ){
        setTimeout(function(){
          deferred.reject()
        },10)
      } else {
        item = collection.pop()
        $localForage.setItem(collectionName,collection)
        setTimeout(function(){
          deferred.resolve(item)
        },10)
      }
      return deferred.promise
    })
  }


  self.addPomodoro = function(pomodoro){
    var _pomodoro = JSON.parse(JSON.stringify(pomodoro))
    return $localForage.getItem('pomodori').then(function(pomodori){
      if( PomodoroValidator.validate(_pomodoro) ){
        pomodori.push( _pomodoro )
        console.log('adding pomodoro',_pomodoro)
      }else{
        console.error('invalid pomodoro', _pomodoro)
      }
      return $localForage.setItem('pomodori',pomodori)
    })
  }

  self.getPomodori = function(){
    return $localForage.getItem('pomodori')
  }

  ;(function normalizeData(){
    $localForage.getItem('pomodori').then(function(pomodori){
      pomodori = pomodori || []
      $localForage.setItem('pomodori',pomodori)
    })
  })();
})
