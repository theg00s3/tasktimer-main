import React, {Component} from 'react'
import './SignupButton.styl'
import StripeCheckout from 'react-stripe-checkout'
import pomodoroImage from '../assets/images/pomodoro.cc.png'

export default class SignupButton extends Component {
  render () {
    const {user, actions} = this.props
    if (!user) {
      return null
    }

    let stripeKey = /pomodoro/.test(location.href) ? 'pk_live_geRcjLp8LZwxhvZZDC3Osyyt00MisZGF5a' : 'pk_test_YGvkKlL7hsxpF3MEDRIybf0K00gwLTthfY'
    if (localStorage.stripeTest) stripeKey = 'pk_test_YGvkKlL7hsxpF3MEDRIybf0K00gwLTthfY'

    return <div className='signup-button'>
      <img src={user.avatar} className='user-avatar' />

      &nbsp;
      &nbsp;

      <StripeCheckout
        token={token => actions.createSubscription(token)}
        email={user.email}
        label='Pay'
        image={pomodoroImage}
        panelLabel='Pay'
        currency='EUR'
        amount={100}
        allowRememberMe={false}
        stripeKey={stripeKey} />

    </div>
  }
}
