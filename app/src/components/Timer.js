require('./Timer.styl')
import React, {Component} from 'react'

export default class Timer extends Component {
  render() {
    const {timer} = this.props
    return  <div className="timer">
              {timer}
            </div>
  }
}
