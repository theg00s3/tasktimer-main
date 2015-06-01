var React = require('react')
var Main = require('../components/main')

module.exports = function(context){
  React.render(<Main></Main>, document.querySelector('main'))
}

