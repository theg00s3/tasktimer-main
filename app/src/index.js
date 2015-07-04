var React = require('react')
var router = require('./router')
var logger = require('./modules/Logger')
var Header = require('./components/Header')
var Footer = require('./components/Footer')

React.render(<Header/>, document.getElementById('main-header'))
React.render(<Footer/>, document.getElementById('main-footer'))

router.start()

require('./init/auth')()
require('./init/appCache')()
require('./init/Timer')()

logger.enable( !/pomodoro\.cc/.test(window.location.host) )
