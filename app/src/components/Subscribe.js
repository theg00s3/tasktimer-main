import React, {Component} from 'react'
import './Subscribe.styl'
import SubscribeButton from './SubscribeButton'
import Link from '../components/utils/Link'

import AnalysisImage from '../assets/images/analysis.png'
import StatisticsImage from '../assets/images/statistics.png'
import DarkmodeImage from '../assets/images/darkmode.png'

export default class Subscribe extends Component {
  render () {
    const {user, subscription, actions} = this.props
    return <div className='content1 tac'>
      <div className='subscribe'>
        <h1 className='title'>Pomodoro.cc <span className='pro-badge'>Pro</span></h1>

        <div className='price-choices'>
          <div className='price'>
            <span className='price-symbol'>€</span>
            <span className='price-amount'>1</span>
            <span className='price-frequency'>/mo</span>
          </div>
        </div>

        {!user &&
          <div className='tac pad'>
            Please <Link to='/login'>login</Link> first
          </div>}

        <SubscribeButton user={user} actions={actions} />

        {subscription.errorMessage && <div className='error-message'>{subscription.errorMessage}</div>}
        {subscription.successMessage && <div className='success-message'>
          {subscription.successMessage}

          <br />

          Checkout the <Link to='/statistics'>Statistics</Link> page now!
        </div>}

        <br />
        <br />

        <ul className='pro-reasons tac'>
          <h1 className='title tac'>What you'll get</h1>
          <li className=''>
            ⚡️ Statistics about your days, weeks and months
            <br />
            <br />
            <img src={StatisticsImage} alt='statistics' style='width: 100%; max-width: 700px' />
          </li>
          <li className=''>
            ⚡️ Analysis of your historic timers and todos
            <br />
            <br />
            <img src={AnalysisImage} alt='analysis' style='width: 100%; max-width: 700px' />
          </li>
          <li className=''>
            ️️️⚡️ Sync data between devices
          </li>
          <li className=''>
            ️️️⚡️ Dark mode
            <br />
            <br />
            <img src={DarkmodeImage} alt='darkmode' style='width: 100%; max-width: 700px' />
          </li>
          <li className=''>
            ️️️⚡️ Channel-reservation (Team Pomodoro)
          </li>
          <li className=''>
            ⚡️ Access your account data via API
          </li>
        </ul>
      </div>
    </div>
  }
}
