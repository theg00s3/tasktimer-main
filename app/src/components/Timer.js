import React, { Component } from 'react'
import './Timer.styl'

export default class Timer extends Component {
  submitMinutes (event) {
    const { actions } = this.props

    if (event.keyCode !== 13) return
    const minutes = parseInt(event.target.value)
    actions.startStopTimer(minutes, 'custom')
  }

  render () {
    const { timer } = this.props
    const [, minutes, seconds] = timer.match(/(\d+):(\d+)/)

    return <div id='timer' className='timer'>
      <span className='minutes'>{minutes}</span>:<span className='seconds'>{seconds}</span>
    </div>
  }
}
