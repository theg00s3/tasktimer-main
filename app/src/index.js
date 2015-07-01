var React = require('react')
var page = require('page')
var router = require('./router')
var logger = require('./modules/Logger')

logger.enable( !/pomodoro\.cc/.test(window.location.host) )

router.start()

var Header = require('./components/Header')
var Footer = require('./components/Footer')

React.render(<Header/>, document.getElementById('main-header'))
React.render(<Footer/>, document.getElementById('main-footer'))

require('./init/auth')()
require('./init/appCache')()
