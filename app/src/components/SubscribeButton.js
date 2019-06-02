import React, {Component} from 'react'
import './SubscribeButton.styl'
import StripeCheckout from 'react-stripe-checkout'
import pomodoroImage from '../assets/images/pomodoro.cc.png'

export default class SubscribeButton extends Component {
  onToken (token) {
    console.log('token', token)
    const stripeToken = token.id
    const createSubscriptionUrl = /pomodoro/.test(location.href) ? 'https://api.pomodoro.cc/create-subscription' : 'http://localhost:3000/create-subscription'
    fetch(createSubscriptionUrl, {
      method: 'POST',
      body: JSON.stringify({stripeToken}),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('data', data)
      if (data.error) {
        alert(`Something went wrong.\n ${data.message || data.error}`)
        return
      }
      alert(`we are in business.\n ${data.message}`)
    })
  }

  render () {
    const {user} = this.props
    if (!user) {
      return null
    }

    let stripeKey = /pomodoro/.test(location.href) ? 'pk_live_geRcjLp8LZwxhvZZDC3Osyyt00MisZGF5a' : 'pk_test_YGvkKlL7hsxpF3MEDRIybf0K00gwLTthfY'
    if (localStorage.stripeTest) stripeKey = 'pk_test_YGvkKlL7hsxpF3MEDRIybf0K00gwLTthfY'

    return <div className='payment'>
      <img src={user.avatar} class='user-avatar' />
      &nbsp;
      &nbsp;

      <StripeCheckout
        token={this.onToken}
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
