import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import './Profile.styl'
import Signup from '../components/Signup'
import Login from './Login'
dayjs.extend(utc)

class Profile extends Component {
  render () {
    const {user, subscription, actions, darkMode} = this.props

    if (!user) {
      return <Login />
    }

    return <div className='content'>
      <h1 className='title tac'>
        {user.avatar &&
          <img style='width: 30px;border-radius: 50%;' src={user.avatar} />}
        &nbsp;
        {user.username}
      </h1>
      {user.subscription &&
        <div className='pad tac1'>
          <label>Subscription status</label> {user.subscription && user.subscription.status}
        </div>}

      {user.subscription && user.subscription.start_date &&
        <div className='pad tac1'>
          <label>Customer since</label> {dayjs(user.subscription.start_date * 1000).format('YYYY-MM-DD')}
        </div>}

      {user.subscription && user.subscription.current_period_start &&
        <div className='pad tac1'>
          <label>Current Subscription Start</label> {dayjs(user.subscription.current_period_start * 1000).format('YYYY-MM-DD-THH:mm')}
        </div>}

      {user.subscription && user.subscription.current_period_end &&
        <div className='pad tac1'>
          <label>Current Subscription End</label> {dayjs(user.subscription.current_period_end * 1000).format('YYYY-MM-DD-THH:mm')}
        </div>}

      {/* {user.apikey && user.hasActiveSubscription &&
        <div className='pad tac1'>
          <label>API key</label> <textarea style='outline: none; border: none;' value={user.apikey} cols={5} rows={1} />
        </div>} */}

      {user.hasActiveSubscription && <div className='pad' onClick={() => actions.toggleDarkMode()}>
        <h1>Dark mode</h1>
        <small>click to toggle</small>
        <span>
          {darkMode.enabled ? 'on' : 'off'}
        </span>
      </div>}

      {!user.hasActiveSubscription &&
        <div>
          <div className='pad'>
            <h1 className='title tac signup-to-pro'>Signup to Pro!</h1>
          </div>
          <Signup user={user} subscription={subscription} actions={actions} />
        </div>
      }

      <pre style='display: none'>{JSON.stringify(user, null, 2)}</pre>
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Profile)
