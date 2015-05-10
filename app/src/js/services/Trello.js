angular.module('app')
.service('Trello', function(DataManager,constants){
  var self = this

  var token = localStorage.getItem('trelloToken')

  self.setToken = function(_token){
    token = _token
    localStorage.setItem('trelloToken',token)
  }
  self.getToken = function(){
    return token
  }

  self.getKey = function(){
    return constants.trello.key
  }

  self.isAuthorized = function(){
    return !!token
  }

  self.deauthorize = function(){
    self.setToken('')
    localStorage.setItem('trelloToken','')
  }

  self.getTokenFrom = function(str){
    var token = str.match(/token=(.*)$/)
    if( token ){
      return token[1]
    }
    return undefined
  }

  self.getGrantUrl = function(){
    var opt = constants.trello

    return opt.authTemplateString.replace(/\{(.*?)\}/gi, function(match, prop) {
      return opt[prop] || match
    })
  }
})
