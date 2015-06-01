var React = require('react')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      seconds: 0,
      time: '00:00'
    }
  },
  render: function(){
    return  <div className="pomodoro">
              {this.state.time}
            </div>
  }
})
