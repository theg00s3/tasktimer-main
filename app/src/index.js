var React = require('react')
var page = require('page')
var pageLogger = require('./modules/page.logger')

var Header = require('./components/header')

React.render(<Header/>, document.getElementById('main-header'))

page('*', pageLogger, function(){
})

page.start()
