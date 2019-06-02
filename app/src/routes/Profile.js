import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import Link from '../components/utils/Link'
import './Profile.styl'
import Subscribe from '../components/Subscribe'
dayjs.extend(utc)

class Profile extends Component {
  render () {
    const {user, subscription, actions} = this.props

    if (!user) return null

    return <div className='content'>
      {(!user.subscription || user.subscription.status !== 'active') && <Subscribe user={user} subscription={subscription} actions={actions} />}

      <h1 className='title tac'>
        {user.avatar &&
          <img style='width: 30px;border-radius: 50%;' src={user.avatar} />}
        &nbsp;
        {user.username}
      </h1>
      {user.subscription &&
        <div className='pad tac1'>
          <strong>Subscription status</strong> {user.subscription.status === 'active' ? '✅ active' : user.subscription.status}
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

      {user.apikey &&
        <div className='pad tac1'>
          <strong>API key</strong> {user.apikey}
        </div>}

      <pre style='display: none'>{JSON.stringify(user, null, 2)}</pre>
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  distractions: state.distractions,
  subscription: state.subscription,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Profile)
