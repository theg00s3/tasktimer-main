var React = require('react')
var Main = require('../components/Main')

module.exports = function(context){
  React.render(<Main></Main>, document.querySelector('main'))
}

