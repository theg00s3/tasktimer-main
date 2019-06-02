import React, {Component} from 'react'
import './Subscribe.styl'
import SubscribeButton from './SubscribeButton'

export default class Subscribe extends Component {
  render () {
    const {user} = this.props
    return <div className='content tac'>
      <div className=''>
        <h1 className='title'>Subscribe to Pomodoro.cc Monthly</h1>
        <h2 className='title is-2'>Only 1 € / month</h2>

        <SubscribeButton user={user} />
      </div>
    </div>
  }
}
