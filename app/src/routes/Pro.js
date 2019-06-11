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
