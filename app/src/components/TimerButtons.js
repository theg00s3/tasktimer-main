require('./TimerButtons.styl')
import React, {Component, PropTypes} from 'react'

export default class TimerButtons extends Component {
  startStopTimer (minutes, type) {
    const {actions, pomodoro} = this.props
    if( pomodoro.minutes ){
      actions.forceEndTimer()
    }
    if( pomodoro.minutes !== minutes ) {
      actions.startTimer(minutes, type)
    }
  }

  render () {
    return  <div className="timer-buttons-container">
              <button onClick={() => this.startStopTimer(25,'pomodoro')}>25min</button>
              <button onClick={() => this.startStopTimer(5,'break')}>5min</button>
              <button onClick={() => this.startStopTimer(15,'break')}>15min</button>
            </div>
  }
}
TimerButtons.propTypes = {
  actions: PropTypes.object.isRequired,
  pomodoro: PropTypes.object.isRequired,
}
