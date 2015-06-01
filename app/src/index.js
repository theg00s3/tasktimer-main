var React = require('react')
var page = require('page')

var Header = require('./components/header')

React.render(<Header/>, document.getElementById('main-header'))

page('*', function(){
  console.log('page /', arguments)
})

page.start()
