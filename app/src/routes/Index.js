import Pomodoro from '../components/Pomodoro'
import TodoList from '../components/TodoList'
import SoundSettings from '../components/SoundSettings'
import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class Index extends Component {
  render () {
    const {timer, todos, settings, pomodoro, actions} = this.props
    return <div className='content'>
      <Pomodoro timer={timer} pomodoro={pomodoro} actions={actions} />
      <SoundSettings settings={settings} actions={actions} />
      <TodoList todos={todos} actions={actions} />
      {this.renderLoginInvite()}
    </div>
  }

  renderLoginInvite () {
    const {user} = this.props
    return !user.username
      ? <p className='login-invite'>
        <Link to='login'>Login or signup</Link> to track your tasks and pomodoros,<br /> it`s totally free!
        </p>
      : null
  }
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer,
    user: state.user,
    api: state.api
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Index)
