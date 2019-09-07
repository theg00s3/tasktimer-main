import Timer from '../components/Timer'
import TimerButtons from '../components/TimerButtons'
import Link from '../components/utils/Link'
import TodoForm from '../components/TodoForm'
import PomodorosChart from '../components/PomodorosChart'
import TweetButton from '../components/TweetButton'
import * as actions from '../actions'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SoundSettings from '../components/SoundSettings'

class Main extends Component {
  render () {
    const { api, timer, todos, pomodoros, user, actions, settings, loading, darkMode } = this.props

    let pomodorosToShow = (user && user.hasActiveSubscription)
      ? api.pomodorosForDate.pomodoros
      : pomodoros

    pomodorosToShow = pomodorosToShow
      // .filter(p => p.type === 'pomodoro')
      .filter(p => Date.parse(p.startedAt))
      // .filter(p => !p.cancelled)

    const todosToShow = (user && user.hasActiveSubscription)
      ? api.todolist
      : (loading.loadingUser ? [] : todos)

    return <div className='content' id='start'>
      {pomodorosToShow.length > 0 && <div className='tar pad1'>
        <TweetButton pomodoros={pomodorosToShow} />
      </div>}

      {user && pomodorosToShow.length > 0 &&
      <div class='hover-container' style='margin: 0 auto; max-width: 330px; width: 100%;'>
        <PomodorosChart pomodoros={pomodorosToShow} micro />
        <span className='tara hover-element'>
          see more in &nbsp;
          <Link to='/statistics'>stats</Link>
        </span>
      </div>}

      <Timer actions={actions} timer={timer} />

      <TimerButtons actions={actions} />

      {!user && <div className='tac'>
        Sound settings available to logged in users
      </div>}
      {user && <SoundSettings actions={actions} settings={settings} darkMode={darkMode} />}

      <TodoForm todos={todosToShow} actions={actions} showLoading={loading.loadingTodolist} editable showStatsLink />
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Main)
