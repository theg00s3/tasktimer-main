import Pomodoro from '../components/Pomodoro'
import Link from '../components/utils/Link'
import TodoForm from '../components/TodoForm'
import PomodorosChart from '../components/PomodorosChart'
import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Main extends Component {
  render () {
    const {timer, todos, pomodoro, pomodoros = [], user, actions} = this.props
    return <div className='content' id='start'>
      {user &&
      <div style='margin: 0 auto; width: 300px;'>
        <PomodorosChart pomodoros={pomodoros} micro />
        {user && !user.hasActiveSubscrion && <span>See more in <Link to='/statistics'>stats</Link></span>}
      </div>}
      <Pomodoro timer={timer} pomodoro={pomodoro} actions={actions} />
      <TodoForm todos={todos} actions={actions} editable showStatsLink />
    </div>
  }
}

export default connect(
  (state) => ({
    user: state.user,
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    pomodoros: state.pomodoros,
    timer: state.timer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(Main)
