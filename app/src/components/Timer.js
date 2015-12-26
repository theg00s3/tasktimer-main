require('./Timer.styl')
import React, {Component, PropTypes} from 'react'

export default class Timer extends Component {
  render () {
    const {timer} = this.props
    return  <div className="timer">
              {timer}
            </div>
  }
}
Timer.propTypes = {
  timer: PropTypes.string.isRequired
}
