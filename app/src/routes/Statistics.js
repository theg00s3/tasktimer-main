import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import querystring from 'querystring'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import Link from '../components/utils/Link'
import TodoForm from '../components/TodoForm'
import PomodorosChart from '../components/PomodorosChart'
import paperSheet from '../assets/images/paper-sheet.png'
import './Statistics.styl'
import Subscribe from '../components/Subscribe'
dayjs.extend(utc)

class Statistics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      onlyShowCompleted: true
    }
  }
  render () {
    const {user, todos, pomodoros, subscription, actions} = this.props

    if (!user || !user.subscription || user.subscription.status !== 'active') {
      return <Subscribe user={user} subscription={subscription} actions={actions} />
    }

    const qs = querystring.parse(window.location.search.replace('?', ''))

    const date = qs.date || new Date().toISOString().substring(0, 10)
    const today = new Date().toISOString().substring(0, 10)

    let dayBefore = dayjs(date).subtract(0, 'day').toISOString().substr(0, 10)
    let dayAfter = dayjs(date).add(2, 'day').toISOString().substr(0, 10)

    if (!qs.date) {
      window.history.pushState(null, document.title, window.location.pathname + `?date=${date}`)
    }

    actions.getPomodorosForDay(date)

    const completedTodos = todos
      .filter(Boolean)
      .filter(t => t.completed)
      .filter(t => t.completedAt)
      .filter(t => new Date(t.completedAt).toISOString().substring(0, 10) === date)
    const completedPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.completed)
      .filter(p => p.startedAt)
      .filter(p => new Date(p.startedAt).toISOString().substring(0, 10) === date)
    const allPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.startedAt)
      .filter(p => new Date(p.startedAt).toISOString().substring(0, 10) === date)

    return <div className='content'>
      <h1 className='title tac'>Statistics for {date}</h1>

      <br />

      <div className='tar'>
        only show completed
        <input type='checkbox' checked={this.state.onlyShowCompleted} onClick={() => { this.setState({onlyShowCompleted: !this.state.onlyShowCompleted}) }} />
      </div>

      <br />

      <div className='stats-navigation'>
        <Link to={`/statistics?date=${dayBefore}`} className='statistics-nav-button'>&lt; {dayBefore}</Link>
        {(date !== today)
          ? <Link to={`/statistics?date=${dayAfter}`} className='statistics-nav-button float-right'>{dayAfter} &gt;</Link> : null}
      </div>

      {completedPomodoros.length === 0 && <div className='pad'>
        <div class='columns'>
          <div class='column pad-v tac'>
            <div>
              <img className='paper-sheet' src={paperSheet} />
            </div>
          </div>
        </div>
      </div>}

      {completedPomodoros.length === 0 && <div className='pad'>
        <div class='columns'>
          <div class='column pad-v tac'>
            <div>
              You haven't completed any pomodoros.
            </div>
          </div>
        </div>
      </div>}

      <br />

      <div className='pad'>
        <PomodorosChart pomodoros={this.state.onlyShowCompleted ? completedPomodoros : allPomodoros} micro={false} />
      </div>

      <br />

      <div className='pad'>
        <div>
          <div class='columns'>
            {completedPomodoros.length > 0 &&
              <div class='column pad-v tac'>
                <h1 class='no-m'>{completedPomodoros.length}</h1> pomodoros
              </div>}
            <div class='column pad-v tac'>
              <h1 class='no-m'>{durationInPomodoros(allPomodoros)}</h1> pomodoros in total
            </div>
          </div>

          <br />

          {completedTodos.length === 0 && <div class='column pad-v'>
            <div className='tac'>
              You haven't completed any todos.
            </div>
          </div>}

          <br />

          {completedTodos.length > 0 && <div class='column pad-v'>
            <div className='tac'>
              You were also quite productive today, with {completedTodos.length} tasks completed
            </div>
          </div>}

          <br />

          {(completedPomodoros.length > 0 || completedTodos.length > 0) && <div className='pad'>
            <TodoForm showDeleted todos={completedTodos} actions={actions} editable={false} completable={false} deletable={false} showTitles />
          </div>}
        </div>
      </div>
    </div>
  }
}

function durationInPomodoros (pomodoros) {
  const duration = pomodoros.reduce((acc, pomodoro) => {
    if (pomodoro.startedAt && pomodoro.cancelledAt) {
      const diffInMs = Math.abs(new Date(pomodoro.startedAt) - new Date(pomodoro.cancelledAt))
      const diffInPomodoros = diffInMs / (25 * 60 * 1000)
      return acc + diffInPomodoros
      /*
      1 pomo = 1500000ms
             = 1ms
      */
    }
    return acc + pomodoro.minutes / 25
  }, 0)

  return duration.toFixed(1)
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
}))(Statistics)
