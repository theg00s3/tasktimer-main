import React, {Component} from 'react'
import './Subscribe.styl'
import SubscribeButton from './SubscribeButton'

export default class Subscribe extends Component {
  render () {
    const {user, subscription, actions} = this.props
    return <div className='content tac'>
      <div className=''>
        <h1 className='title'>Subscribe to Pomodoro.cc Monthly</h1>
        <h2 className='title is-2'>Only 1 € / month</h2>

        <SubscribeButton user={user} actions={actions} />

        <br />

        {subscription.errorMessage && <div className='error-message'>{subscription.errorMessage}</div>}
        {subscription.successMessage && <div className='success-message'>{subscription.successMessage}</div>}
      </div>
    </div>
  }
}
