var React = require('react')
var router = require('./router')
var logger = require('./modules/Logger')
var Header = require('./components/Header')
var Footer = require('./components/Footer')

React.render(<Header/>, document.getElementById('main-header'))
React.render(<Footer/>, document.getElementById('main-footer'))


require('./init/Timer')()
require('./init/auth')()
require('./init/FailedPomodoriQueue')()
require('./init/appCache')()

router.start()

logger.enable( !/pomodoro\.cc/.test(window.location.host) )
