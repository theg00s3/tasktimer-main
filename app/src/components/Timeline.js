var React = require('react')
  , moment = require('moment')
  , PomodoroUtils = require('../../../shared/PomodoroUtils')

module.exports = React.createClass({
  render: function(){
    var timeline = this.props.data.map(function(dataPoint){
      var formattedStartedAt = moment(dataPoint.startedAt).format('HH:mm')
      var duration = PomodoroUtils.getDurationInMinutes(dataPoint)
      return  <li className={"type-"+dataPoint.type}>
                <span className="duration">Duration: {duration}min</span>
                <span className="startedAt">{formattedStartedAt}</span>
              </li>
    })

    return <ul className="timeline">
              {timeline}
            </ul>
  }
})
