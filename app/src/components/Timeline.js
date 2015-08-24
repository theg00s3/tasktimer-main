var React = require('react')
  , moment = require('moment')
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
      startHour: TimelineUtils.calculateStartHour(this.props.data),
      endHour: TimelineUtils.calculateEndHour(this.props.data),
    })
  },
  render: function(){
    if( this.props.data.length === 0 )
      return null
    var timelineItems = this.props.data.map(function(item,index,list){
      var renderingData = TimelineUtils.calculateTimelineItem(item, list, this.props.width)
      return  <circle cx={renderingData.x} cy="50%" r={renderingData.r} className={renderingData.className}></circle>
    }.bind(this))
    return  <div className="timeline-container">
              <svg height={this.props.height} width={this.props.width}>
                <g>
                  {timelineItems}
                </g>
                <text y="100%" x="0%">{this.state.startHour}</text>
                <text y="100%" x="95%">{this.state.endHour}</text>
              </svg>
            </div>
  }
})
