var React = require('react')
var Pomodoro = require('./pomodoro')

module.exports = React.createClass({
  render: function() {
    return  <div className="main">
              <Pomodoro/>
            </div>
  }
})
