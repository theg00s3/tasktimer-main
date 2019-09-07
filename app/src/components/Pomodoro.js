import React, { Component } from 'react'
import Timer from './Timer'
import TimerButtons from './TimerButtons'

export default class Pomodoro extends Component {
  render () {
    const { timer, actions } = this.props

    return <div>
      <Timer actions={actions} timer={timer} />
      <TimerButtons actions={actions} />
    </div>
  }
}
