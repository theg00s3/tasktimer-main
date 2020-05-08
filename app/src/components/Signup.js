import React, { Component } from 'react'
import './Signup.styl'
import SignupButton from './SignupButton'
import Link from './utils/Link'

import AnalyticsImage from '../assets/images/analytics.gif'
import StatisticsImage from '../assets/images/statistics.png'
import DarkmodeImage from '../assets/images/darkmode.png'

export default class Signup extends Component {
  render () {
    const { user, subscription, actions } = this.props
    return <div className='content tac'>
      <div className='pad tac'>
        <h1 className='title'>Signup to <span className='pro-badge'>Pro</span> today!</h1>

        <br />
        It's just <strong>$0 a month</strong>!
        <br />
        The benefits for you are
        <br />
        <strong>Statistics, Analytics, Dark Mode, API access</strong>
      </div>

      <div className='signup'>
        <div className='price-choices'>
          <div className='price'>
            <span className='price-symbol'>$</span>
            <span className='price-amount'>0</span>
            <span className='price-frequency'>/mo</span>
          </div>
        </div>

        {!user &&
          <div className='tac pad'>
            <h1 className='title'>Please <Link to='/login'>login</Link> first</h1>
          </div>}

        <SignupButton user={user} actions={actions} />

        {subscription.errorMessage && <div className='error-message'>{subscription.errorMessage}</div>}
        {subscription.successMessage && <div className='success-message'>
          {subscription.successMessage}

          <br />

          Checkout the <Link to='/statistics'>Statistics</Link> page now!
        </div>}

        <br />
        <br />

        <ul className='pro-reasons tac'>
          <h1 className='title tac'>Benefits</h1>
          <li className=''>
            ⚡️ Analytics of your historic timers and todos
            <br />
            <br />
            <img src={AnalyticsImage} alt='analytics' style={{ width: '100%', maxWidth: '700px' }} />
          </li>
          <li className=''>
            ⚡️ Statistics about your days, weeks and months
            <br />
            <br />
            avoid using Excel to track your time, you can access your historic timers and todos through Task Timer
            <br />
            <br />
            <img src={StatisticsImage} alt='statistics' style={{ width: '100%', maxWidth: '700px' }} />
          </li>
          <li className=''>
            ️️️⚡️ Sync data between devices
          </li>
          <li className=''>
            ️️️⚡️ Dark mode
            <br />
            <br />
            <img src={DarkmodeImage} alt='darkMode' style={{ width: '100%', maxWidth: '700px' }} />
          </li>
          <li className=''>
            ⚡️ Access your account data via API
          </li>
        </ul>
      </div>
    </div>
  }
}
