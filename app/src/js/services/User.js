angular.module('app')
.service('User', function($rootScope,$timeout,$http,$cookieStore,constants){
  var self = this
  var user = null
  var subs = {
    'change':[],
  }

  function notify(name,data){
    if( subs[name] ){
      subs[name].forEach(function(sub){
        sub(data)
      })
    }
  }

  function isJSON(json){
    try{
      JSON.parse(json)
      return true
    }catch(e){
      return false
    }
  }

  function subscriptionExists(name,func){
    return angular.isFunction(func) && subs[name] instanceof Array
  }

  self.on = function(name,func){
    if( subscriptionExists(name,func) ){
      subs[name].push(func)
    }
  }

  self.authenticate = function(){
    return $http.get('/auth/info')
      .success(function(_user){
        user = isJSON(_user) ? angular.copy(_user) : null
        notify('change',user)
        return user
      })
      .error(function(){
        user = null
        notify('change',user)
        return user
      })
  }

  self.isLoggedIn = function(){
    return !!user
  }

  self.getUser = function(){
    return user
  }
})
