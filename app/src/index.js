var React = require('react')
var page = require('page')
var router = require('./router')
var UserService = require('./modules/UserService')
var AnalyticsService = require('./modules/AnalyticsService')


router.start()

var Header = require('./components/Header')

React.render(<Header/>, document.getElementById('main-header'))

UserService.authenticate()
.then(function(response){
  var user = response.data
  AnalyticsService.identify(user.id, {
    username: user.username
  })
})
.catch(function(){})

AnalyticsService.track('test')
