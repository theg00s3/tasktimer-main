var React = require('react')
var _ = require('underscore')
var PomodoroUtils = require('../../../shared/PomodoroUtils')

module.exports = React.createClass({
  render: function(){
    var data = this.props.data || []
    if( data.length === 0 )
      return null

    var count = _.reduce(data, function(memo, pomodoro, key, list){
      memo[pomodoro.type] += 1
      memo[pomodoro.type+'Minutes'] += PomodoroUtils.getDurationInMinutes(pomodoro)
      return memo
    }, {pomodoro:0, break:0, pomodoroMinutes: 0, breakMinutes: 0})

    count.pomodoroDuration = PomodoroUtils.minutesToDuration(count.pomodoroMinutes)
    count.breakDuration = PomodoroUtils.minutesToDuration(count.breakMinutes)

    return  <div className={this.props.className + " statistics-details-list"}>
              <ul>
                <li>
                  <span className="count">{count.pomodoro}</span>
                  <span className="description">pomodori</span>
                  <span className="time">{count.pomodoroDuration}</span>
                </li>
                <li>
                  <span className="count">{count.break}</span>
                  <span className="description">breaks</span>
                  <span className="time">{count.breakDuration}</span>
                </li>
              </ul>
            </div>
  }
})
