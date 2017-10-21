import React, {Component} from 'react'
import './TimerButtons.styl'

export default class TimerButtons extends Component {
  startStopTimer (minutes, type) {
    const {actions, pomodoro} = this.props
    if (pomodoro.minutes) {
      actions.forceEndTimer()
    }
    if (pomodoro.minutes !== minutes) {
      actions.startTimer(minutes, type)
    }
  }

  render () {
    return <div className='timer-buttons-container'>
      <button id='minutes-25' onClick={() => this.startStopTimer(25, 'pomodoro')}>25min</button>
      <button id='minutes-5' onClick={() => this.startStopTimer(5, 'break')}>5min</button>
      <button id='minutes-15' onClick={() => this.startStopTimer(15, 'break')}>15min</button>
    </div>
  }
}
