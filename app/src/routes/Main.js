import Pomodoro from '../components/Pomodoro'
import TodoForm from '../components/TodoForm'
// import SoundSettings from '../components/SoundSettings'
import TrackDistraction from '../components/TrackDistraction'
import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Main extends Component {
  render () {
    const {timer, todos, settings, pomodoro, distractions, actions} = this.props
    return <div className='content' id='start'>
      <Pomodoro timer={timer} pomodoro={pomodoro} actions={actions} />
      {/* <SoundSettings settings={settings} actions={actions} /> */}
      <TrackDistraction actions={actions} distractions={distractions} />
      <TodoForm todos={todos} actions={actions} editable />
    </div>
  }
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    distractions: state.distractions,
    timer: state.timer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(Main)
