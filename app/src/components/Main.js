var React = require('react')
var Pomodoro = require('./Pomodoro')

module.exports = React.createClass({
  render: function() {
    var remaining = parseInt(localStorage.remaining, 10)
    return  <div className="main">
              <Pomodoro remaining={remaining}/>
            </div>
  }
})
