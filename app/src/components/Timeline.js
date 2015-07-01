var React = require('react')
  , moment = require('moment')
  , PomodoroUtils = require('../../../shared/PomodoroUtils')
  , TimelineUtils = require('../modules/TimelineUtils')


module.exports = React.createClass({
  getInitialState: function(){
    return {
      startHour: '00:00',
      endHour: '23:59',
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      startHour: TimelineUtils.getStartHour(nextProps.data),
      endHour: TimelineUtils.getEndHour(nextProps.data),
    })
  },
  render: function(){
    return  <svg height="100px" width="100%" >
              <g>
                <line x1="0%" y1="50%" x2="100%" y2="50%" strokeWidth="5" stroke="white"></line>
                <circle cx="50" cy="50" r="25" fill="#fff"></circle>
              </g>
              <text y="100%" x="0%" fill="#fff">{this.state.startHour}</text>
              <text y="100%" x="90%" fill="#fff">{this.state.endHour}</text>
            </svg>
  }
})
