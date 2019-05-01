import React, {Component} from 'react'
import './Timer.styl'

export default class Timer extends Component {
  render () {
    const {timer} = this.props
    return <div id='timer' className='timer'>
      {timer}
    </div>
  }
}
