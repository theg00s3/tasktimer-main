var React = require('react')
  , moment = require('moment')
  , PomodoroUtils = require('../../../shared/PomodoroUtils')
  , TimelineUtils = require('../modules/TimelineUtils')


module.exports = React.createClass({
  getInitialState: function(){
    return {
      startHour: '00:00',
      endHour: '23:59',
      timelineItems: [],
    }
  },
  componentDidMount: function() {
    console.log( timelineItems )
    this.setState({
      startHour: TimelineUtils.getStartHour(this.props.data),
      endHour: TimelineUtils.getEndHour(this.props.data),
    })
  },
  render: function(){
    var timelineItems = this.props.data.map(function(item,index,list){
      var renderingData = TimelineUtils.getRenderingData(item,list)
      return  <circle cx="50%" cy="50%" r="25"></circle>
    })
    timelineItems = null
    return  null/*<svg height="100px" width="100%" >
              <g>
                <line x1="0%" y1="50%" x2="100%" y2="50%" strokeWidth="5"></line>
              </g>

              <text y="100%" x="0%">{this.state.startHour}</text>
              <text y="100%" x="90%">{this.state.endHour}</text>
            </svg>*/
  }
})
