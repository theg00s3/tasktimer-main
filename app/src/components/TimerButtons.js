import React, {Component} from 'react'
import './TimerButtons.styl'

export default class TimerButtons extends Component {
  render () {
    const {actions} = this.props

    return <div className='timer-buttons-container'>
      <button id='minutes-25' onClick={() => actions.startStopTimer(25, 'pomodoro')}>25min</button>
      <button id='minutes-5' onClick={() => actions.startStopTimer(5, 'break')}>5min</button>
      <button id='minutes-15' onClick={() => actions.startStopTimer(15, 'break')}>15min</button>
    </div>
  }
}
