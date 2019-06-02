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
  distractions: state.distractions,
  subscription: state.subscription,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Pro)
