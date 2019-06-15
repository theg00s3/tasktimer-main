import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import querystring from 'querystring'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import TodoForm from '../components/TodoForm'
import PomodorosChart from '../components/PomodorosChart'
import './Statistics.styl'
import Subscribe from '../components/Subscribe'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

dayjs.extend(utc)

class StatisticsFilters extends Component {
  render () {
    const {date = new Date(), onChangeDate = Function.prototype} = this.props

    return <div className=''>
      <Flatpickr
        value={new Date(date)}
        onChange={date => {
          onChangeDate(date && date[0])
        }} />

    </div>
  }
}

function toISOSubstring (date = new Date()) {
  date = new Date(date)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let day = date.getDate()
  day = day < 10 ? `0${day}` : day
  return `${year}-${month}-${day}`
}

class Statistics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      onlyShowCompleted: false,
      date: undefined
    }
  }
  changeDate (date) {
    const {actions} = this.props

    let dateString = toISOSubstring(date)
    this.setState({
      date: dateString
    })
    actions.getPomodorosForDay(dateString)
    window.history.pushState(null, document.title, window.location.pathname + `?date=${dateString}`)
  }

  render () {
    const {api, user, todos, subscription, actions} = this.props

    if (!user || !user.subscription || user.subscription.status !== 'active') {
      return <Subscribe user={user} subscription={subscription} actions={actions} />
    }

    const qs = querystring.parse(window.location.search.replace('?', ''))
    const urlDate = qs.date || new Date().toISOString().substring(0, 10)

    let {date} = this.state
    if (!date) {
      date = urlDate
      this.changeDate(date)
    }

    const completedTodos = todos
      .filter(Boolean)
      .filter(t => t.completed)
      .filter(t => t.completedAt)
      .filter(t => toISOSubstring(t.completedAt) === date)
    const completedPomodoros = api.pomodorosForDate.pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.completed)
      .filter(p => p.startedAt)
      .filter(p => toISOSubstring(p.startedAt) === date)
    const allPomodoros = api.pomodorosForDate.pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.startedAt)
      .filter(p => toISOSubstring(p.startedAt) === date)

    return <div className='content'>
      <h1 className='title tac'>Statistics for {date}</h1>

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
        <StatisticsFilters date={date} onChangeDate={this.changeDate.bind(this)} />

        <PomodorosChart pomodoros={this.state.onlyShowCompleted ? (completedPomodoros || allPomodoros) : allPomodoros} micro={false} />
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
  api: state.api,
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  subscription: state.subscription,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Statistics)
