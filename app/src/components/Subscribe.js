import React, {Component} from 'react'
import './Subscribe.styl'
import SubscribeButton from './SubscribeButton'

export default class Subscribe extends Component {
  render () {
    const {user, subscription, actions} = this.props
    return <div className='content tac'>
      <div className='subscribe'>
        <h1 className='title'>Pomodoro.cc <span className='pro-badge'>Pro</span></h1>

        <div class='price-choices'>
          <div class='price'>
            <span class='price-symbol'>€</span>
            <span class='price-amount'>1</span>
            <span class='price-frequency'>/mo</span>
          </div>
        </div>

        <SubscribeButton user={user} actions={actions} />

        <br />

        <ul className='pro-reasons tal'>
          <h2>What you'll get</h2>
          <li>
            ⚡️ Statistics and Insight
          </li>
          <li>
            ️️️⚡️ Sync pomodoros and todos on all your devices
          </li>
          <li>
            ️️️⚡️ Channel-reservation using the Team Pomodoro
          </li>
          <li>
            ⚡️ Access your account data
          </li>
        </ul>

        <br />

        {subscription.errorMessage && <div className='error-message'>{subscription.errorMessage}</div>}
        {subscription.successMessage && <div className='success-message'>{subscription.successMessage}</div>}
      </div>
    </div>
  }
}
