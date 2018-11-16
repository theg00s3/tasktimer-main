import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'
import './Statistics.styl'

class Statistics extends Component {
  render () {
    const {user, todos, pomodoros} = this.props
    console.log('todos, pomodoros', todos, pomodoros)

    return <div className='content'>
      <h1>Statistics</h1>
      {user && <div>
        Hello <b>{user.username}</b>
      </div>}
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Statistics)
