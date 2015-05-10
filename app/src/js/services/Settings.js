angular.module('app')
.service('Settings', function($localForage){
  var self = this

  var defaultSettings = {
    notificationsEnabled: true,
    soundsEnabled: true,
    ringingSoundEnabled: true,
    tickingSoundEnabled: true,
    remainingTimeEnabled: true,
  }

  ;(function(){
    $localForage.getItem('settings').then(function(settings){
      settings = normalizeSettings(settings)
      $localForage.setItem('settings',settings)
      notifyChange(settings)
    })
  })();

  var changeCallbacks = []

  function notifyChange(settings){
    for (var i = 0; i < changeCallbacks.length; i++) {
      changeCallbacks[i](settings)
    }
  }

  self.get = function(){
    return $localForage.getItem('settings').then(function(settings){
      return normalizeSettings(settings)
    })
  }

  self.save = function(settings){
    if( !settings ){
      return
    }
    notifyChange(settings)
    return $localForage.setItem('settings', settings)
  }

  self.changed = function(callback){
    changeCallbacks.push(callback)
  }

  self.toggle = function(key){
    $localForage.getItem('settings').then(function(settings){
      if( settings[key] !== undefined ){
        settings[key] = !settings[key]
      }
      $localForage.setItem('settings',settings)
      notifyChange(settings)
    })


  }

  function normalizeSettings(settings){
    settings = settings || {}
    for(var key in defaultSettings){
      if( defaultSettings.hasOwnProperty(key) && settings[key] === undefined ){
        settings[key] = defaultSettings[key]
      }
    }
    return settings
  }

})
