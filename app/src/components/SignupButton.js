import React, { Component } from 'react'
import './SignupButton.styl'
import StripeCheckout from 'react-stripe-checkout'
import pomodoroImage from '../assets/images/pomodoro.cc.png'

export default class SignupButton extends Component {
  render () {
    const { user, actions } = this.props
    if (!user) {
      return null
    }

    let stripeKey = /pomodoro/.test(location.href) ? 'pk_live_fw5fb2wIac05VMS5DUepCUcr' : 'pk_live_fw5fb2wIac05VMS5DUepCUcr'
    if (localStorage.stripeTest) stripeKey = process.env.STRIPE_SECRET_KEY
    
    return <div className='signup-button pad'>
      <img src={user.avatar} className='user-avatar' />

      &nbsp;
      &nbsp;

      <StripeCheckout
        token={token => actions.createSubscription(token)}
        email={user.email}
        label='Pay'
        image={pomodoroImage}
        panelLabel='Pay'
        currency='AUD'
        amount={0}
        allowRememberMe={false}
        stripeKey={stripeKey} />

    </div>
  }
}
