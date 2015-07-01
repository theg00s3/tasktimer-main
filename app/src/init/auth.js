var AuthService = require('../modules/AuthService')
var AnalyticsService = require('../modules/AnalyticsService')

module.exports = function(){
  return AuthService.authenticate()
    .then(function(response){
      var user = response.data
      AnalyticsService.identify(user.id, {
        username: user.username
      })
    })
    .catch(function(){
      AnalyticsService.track('login error', arguments)
    })
}
