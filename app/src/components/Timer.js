import React, {Component} from 'react'
import './Timer.styl'

export default class Timer extends Component {
  render () {
    const {timer} = this.props
    return <div className='timer'>
      {timer}
    </div>
  }
}
