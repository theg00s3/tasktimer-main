var React = require('react')
var Pomodoro = require('./Pomodoro')

module.exports = React.createClass({
  render: function() {
    return  <div className="main">
              <Pomodoro/>
            </div>
  }
})
