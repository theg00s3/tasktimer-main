import React, {Component, PropTypes} from 'react'
import Timer from './Timer'
import TimerButtons from './TimerButtons'

export default class Pomodoro extends Component {
  render() {
    const {timer, pomodoro, actions} = this.props
    return  <div>
              <Timer timer={timer}/>
              <TimerButtons pomodoro={pomodoro} actions={actions}/>
            </div>
  }
}
Pomodoro.propTypes = {
  timer: PropTypes.string.isRequired,
  pomodoro: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
