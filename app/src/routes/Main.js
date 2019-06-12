import Timer from '../components/Timer'
import TimerButtons from '../components/TimerButtons'
import Link from '../components/utils/Link'
import TodoForm from '../components/TodoForm'
import PomodorosChart from '../components/PomodorosChart'
import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Main extends Component {
  render () {
    const {timer, todos, pomodoros = [], user, actions} = this.props
    const date = new Date().toISOString().substring(0, 10)
    const pomodorosForChart = pomodoros
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.completed)
      .filter(p => Date.parse(p.startedAt))
      .filter(p => new Date(p.startedAt).toISOString().substring(0, 10) === date)

    return <div className='content' id='start'>
      <Timer actions={actions} timer={timer} />

      <TimerButtons actions={actions} />

      {user && pomodorosForChart.length > 0 &&
      <div style='margin: 0 auto; max-width: 330px; width: 100%;'>
        <PomodorosChart pomodoros={pomodorosForChart} micro onlyShowCompleted />
        see more in <Link to='/statistics'>stats
        </Link>
      </div>}

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
    team: state.team,
    timer: state.timer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(Main)
