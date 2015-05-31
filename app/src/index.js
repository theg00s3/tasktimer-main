var React = require('react')

var HelloMessage = require('./components/hello')
var MainHeader = require('./components/main-header')

React.render(<HelloMessage name="John" />, document.getElementById('hello-message'))
React.render(<MainHeader/>, document.getElementById('main-header'))
