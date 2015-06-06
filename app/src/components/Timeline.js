var React = require('react')
var moment = require('moment')
var PomodoroUtils = require('../../../shared/PomodoroUtils')

module.exports = React.createClass({
  render: function(){
    var timeline = this.props.data.map(function(dataPoint){
      var formattedStartedAt = moment(dataPoint.startedAt).format('HH:mm')
      var duration = PomodoroUtils.getDuration(dataPoint)
      return  <li className={"type-"+dataPoint.type}>
                <span className="duration">{duration}</span>
                <span className="startedAt">{formattedStartedAt}</span>
              </li>
    })

    return <ul className="timeline">
              {timeline}
            </ul>
  }
})
