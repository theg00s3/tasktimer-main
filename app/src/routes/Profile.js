import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import './Profile.styl'
import Subscribe from '../components/Subscribe'
dayjs.extend(utc)

class Profile extends Component {
  render () {
    const {user, subscription, actions, darkMode} = this.props

    if (!user) return null

    return <div className='content'>
      <h1 className='title tac'>
        {user.avatar &&
          <img style='width: 30px;border-radius: 50%;' src={user.avatar} />}
        &nbsp;
        {user.username}
      </h1>
      {user.subscription &&
        <div className='pad tac1'>
          <strong>Subscription status</strong> {user.hasActiveSubscription ? '✅ active' : user.subscription.status}
        </div>}

      {user.subscription && user.subscription.start_date &&
        <div className='pad tac1'>
          <strong>Customer since</strong> {dayjs(user.subscription.start_date * 1000).format('YYYY-MM-DD')}
        </div>}

      {user.subscription && user.subscription.current_period_start &&
        <div className='pad tac1'>
          <strong>current_period_start</strong> {dayjs(user.subscription.current_period_start * 1000).format('YYYY-MM-DD-THH:mm')}
          <br />
          <strong>current_period_end</strong> {dayjs(user.subscription.current_period_end * 1000).format('YYYY-MM-DD-THH:mm')}
        </div>}

      {user.apikey && user.hasActiveSubscription &&
        <div className='pad tac1'>
          <strong>API key</strong> <textarea style='outline: none; border: none;' value={user.apikey} cols={5} rows={1} />
        </div>}

      {true && <div onClick={() => actions.toggleDarkMode()}>
        <h1>dark mode: <span>
          {darkMode.enabled ? 'on' : 'off'}
        </span></h1>

        <small>click to toggle</small>
      </div>}

      {!user.hasActiveSubscription &&
        <div>
          <div className='pad'>
            <h1 class='title tac subscribe-to-pro'>Subscribe to Pro!</h1>
          </div>
          <Subscribe user={user} subscription={subscription} actions={actions} />
        </div>
      }

      <pre style='display: none'>{JSON.stringify(user, null, 2)}</pre>
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  subscription: state.subscription,
  user: state.user,
  darkMode: state.darkMode
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Profile)
