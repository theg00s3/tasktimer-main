import React, {Component} from 'react'
import './SubscribeButton.styl'
import StripeCheckout from 'react-stripe-checkout'

export default class SubscribeButton extends Component {
  onToken (token) {
    console.log('token', token)
    const stripeToken = token.id
    const createSubscriptionUrl = /pomodoro/.test(location.href) ? 'https://api.pomodoro.cc/create-subscription' : 'http://localhost:3000/create-subscription'
    fetch(createSubscriptionUrl, {
      method: 'POST',
      body: JSON.stringify({stripeToken}),
      // mode: 'cors',
      // cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business.\n ${data.message}`)
      })
    })
  }

  render () {
    const {user} = this.props
    if (!user) {
      return <div className=''>
        ddd
      </div>
    }

    let stripeKey = /pomodoro/.test(location.href) ? 'pk_live_geRcjLp8LZwxhvZZDC3Osyyt00MisZGF5a' : 'pk_test_YGvkKlL7hsxpF3MEDRIybf0K00gwLTthfY'
    if (localStorage.stripeTest) stripeKey = 'pk_test_YGvkKlL7hsxpF3MEDRIybf0K00gwLTthfY'

    return <div className='payment'>
      <img src={user.avatar} class='user-avatar' />
      &nbsp; only 1 € / month &nbsp;

      <StripeCheckout
        token={this.onToken}
        stripeKey={stripeKey}
      />

    </div>
  }
}
