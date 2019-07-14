import React, {Component} from 'react'
import './Signup.styl'
// import SignupButton from './SignupButton'
// import Link from './utils/Link'

export default class Signup extends Component {
  render () {
    // const {user, subscription, actions} = this.props
    return <div className='content tac'>
      <div className='signup'>
        Signup to &nbsp;

        <span>Pomodoro.cc <span className='pro-badge'>Pro</span></span>

        <div className='price-choices'>
          <div className='price'>
            <span className='price-symbol'>€</span>
            <span className='price-amount'>1</span>
            <span className='price-frequency'>/mo</span>
          </div>
        </div>

        {/* <ul className='pro-reasons tal'>
          <h1 className='title tac'>What you'll get</h1>
          <li className=''>
            ⚡️ Statistics and Insight
          </li>
          <li className=''>
            ️️️⚡️ Sync data between devices
          </li>
          <li className=''>
            ️️️⚡️ Dark mode
          </li>
          <li className=''>
            ️️️⚡️ Channel-reservation (Team Pomodoro)
          </li>
          <li className=''>
            ⚡️ Access your account data via API
          </li>
        </ul> */}
      </div>
    </div>
  }
}
