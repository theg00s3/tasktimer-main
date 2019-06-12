import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import * as actions from '../actions'
import Link from '../components/utils/Link'
import TodoForm from '../components/TodoForm'
import PomodorosChart from '../components/PomodorosChart'
import './StatisticsWeekly.styl'
import Subscribe from '../components/Subscribe'
dayjs.extend(utc)
dayjs.extend(weekOfYear)

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

    const currentWeekNumber = dayjs().week()
    let weekNumber = parseInt(window.location.pathname.replace('/statistics/weekly/', ''))
    if (!weekNumber) {
      window.history.pushState(null, document.title, window.location.pathname + `/${currentWeekNumber}`)
    }

    weekNumber = weekNumber || currentWeekNumber

    const previousWeekNumber = dayjs().week(weekNumber).subtract(1, 'week').week()
    const nextWeekNumber = dayjs().week(weekNumber).add(1, 'week').week()

    const startOfWeek = dayjs().startOf('week')
    const endOfWeek = dayjs().endOf('week')

    actions.getPomodorosForWeek && actions.getPomodorosForWeek(weekNumber)

    const completedTodos = todos
      .filter(Boolean)
      .filter(t => t.completed)
      .filter(t => t.completedAt)
      .filter(t => new Date(t.completedAt) > startOfWeek)
      .filter(t => new Date(t.completedAt) < endOfWeek)
    const completedPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.completed)
      .filter(p => p.startedAt)
      .filter(t => new Date(t.startedAt) > startOfWeek)
      .filter(t => new Date(t.startedAt) < endOfWeek)
    const allPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.startedAt)
      .filter(t => new Date(t.startedAt) > startOfWeek)
      .filter(t => new Date(t.startedAt) < endOfWeek)

    return <div className='content'>
      <h1 className='title tac'>Statistics for week <strong>{weekNumber}</strong></h1>

      <br />
      previousWeekNumber: {previousWeekNumber}
      <br />
      currentWeekNumber: {currentWeekNumber}
      <br />
      nextWeekNumber: {nextWeekNumber}

      <div className='stats-navigation'>
        <Link to={`/statistics/weekly/${previousWeekNumber}`} className='statistics-nav-button'>&lt; {previousWeekNumber}</Link>
        {(weekNumber !== currentWeekNumber)
          ? <Link to={`/statistics/weekly/${nextWeekNumber}`} className='statistics-nav-button float-right'>{nextWeekNumber} &gt;</Link> : null}
      </div>

      <div className='pad'>
        <PomodorosChart pomodoros={this.state.onlyShowCompleted ? completedPomodoros : allPomodoros} micro={false} />
        <br />
        <div className='tar'>
          only show completed
          <input type='checkbox' checked={this.state.onlyShowCompleted} onClick={() => { this.setState({onlyShowCompleted: !this.state.onlyShowCompleted}) }} />
        </div>
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
