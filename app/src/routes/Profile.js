import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import './Profile.styl'
import Login from './Login'
dayjs.extend(utc)

class Profile extends Component {
  render () {
    const { user, actions, darkMode } = this.props

    if (!user) {
      return <Login />
    }
    user.hasActiveSubscription = true
    return <div className='content'>
      <h1 className='title tac'>
        {user.avatar &&
          <img style='width: 30px;border-radius: 50%;' src={user.avatar} />}
        &nbsp;
        {user.username}
      </h1>

      {/* {user.apikey && user.hasActiveSubscription &&
        <div className='pad tac1'>
          <label>API key</label> <textarea style='outline: none; border: none;' value={user.apikey} cols={5} rows={1} />
        </div>} */}

      <div className='pad' onClick={() => actions.toggleDarkMode()}>
        <h1>Dark mode</h1>
        <small>Click to toggle</small>
        <span>&nbsp; {darkMode.enabled ? 'off' : 'on'}</span>
      </div>
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
