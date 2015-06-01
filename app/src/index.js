var React = require('react')
var page = require('page')
var router = require('./router')

router.start()

var Header = require('./components/Header')

React.render(<Header/>, document.getElementById('main-header'))
