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
  componentDidMount: function() {
    this.setState({
      startHour: TimelineUtils.getStartHour(this.props.data),
      endHour: TimelineUtils.getEndHour(this.props.data),
    })
  },
  render: function(){
    var timelineItems = this.props.data.map(function(item,index,list){
      var renderingData = TimelineUtils.getRenderingData(item,list)
      return  <circle cx={renderingData.x} cy="50%" r="25"></circle>
    })
    return  <svg height={this.props.height} width={this.props.width}>
              <g>
                {timelineItems}
              </g>
              <text y="100%" x="0%">{this.state.startHour}</text>
              <text y="100%" x="90%">{this.state.endHour}</text>
            </svg>
  }
})
