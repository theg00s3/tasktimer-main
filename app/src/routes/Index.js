import Pomodoro from '../components/Pomodoro'
import TodoList from '../components/TodoList'
// import SoundSettings from '../components/SoundSettings'
import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Index extends Component {
  render () {
    const {timer, todos, settings, pomodoro, actions} = this.props
    return <div className='content' id='start'>
      <Pomodoro timer={timer} pomodoro={pomodoro} actions={actions} />
      {/* <SoundSettings settings={settings} actions={actions} /> */}
      <TodoList todos={todos} actions={actions} />
    </div>
  }
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(Index)
