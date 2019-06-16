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
    const {api, timer, todos, user, actions} = this.props
    const pomodorosForChart = api.pomodorosForDate.pomodoros
      .filter(p => p.type === 'pomodoro')
      .filter(p => Date.parse(p.startedAt))

    return <div className='content' id='start'>
      <Timer actions={actions} timer={timer} />

      <TimerButtons actions={actions} />

      {user && pomodorosForChart.length > 0 &&
      <div style='margin: 0 auto; max-width: 330px; width: 100%;'>
        <PomodorosChart pomodoros={pomodorosForChart} micro onlyShowCompleted />
        <span className='tara'>
          see more in &nbsp;
          <Link to='/statistics'>stats</Link>
        </span>
      </div>}

      <TodoForm todos={todos} actions={actions} editable showStatsLink />
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Main)
