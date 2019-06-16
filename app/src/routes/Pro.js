import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import Link from '../components/utils/Link'
import './Pro.styl'
import Subscribe from '../components/Subscribe'
dayjs.extend(utc)

class Pro extends Component {
  render () {
    const {user, subscription, actions} = this.props

    if (user && user.subscription && user.subscription.status === 'active') {
      return <div className='content'>
        <div className='success-message'>
          All good, you're already Pro!
          <br />
          Visit your <Link to='/statistics'>Statistics</Link> page
        </div>
      </div>
    }

    return <div className='content'>
      {(!user || !user.hasActiveSubscription) &&
        <div className='pad tac'>
          Subscribe to <span className='pro-badge'>Pro</span> today!
          <br />
          It's just <strong>1 € a month</strong>, and you get
          <br />
          <strong>Statistics, Dark Mode, Reserved Team Channels, API access</strong>
        </div>}

      <Subscribe user={user} subscription={subscription} actions={actions} />
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  subscription: state.subscription,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Pro)
