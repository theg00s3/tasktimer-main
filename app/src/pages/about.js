var React = require('react')

module.exports = function(context){
  React.render(
    <div className="content">
      <h1>About</h1>
    </div>,
  document.querySelector('main'))
}

