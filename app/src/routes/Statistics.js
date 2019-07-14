import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import querystring from 'querystring'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import TodoForm from '../components/TodoForm'
import toISOSubstring from '../modules/to-iso-substring'
import PomodorosChart from '../components/PomodorosChart'
import './Statistics.styl'
import Subscribe from '../components/Subscribe'
import 'flatpickr/dist/themes/light.css'
import Flatpickr from 'react-flatpickr'
import Heatmap from '../components/Heatmap'

dayjs.extend(utc)

class StatisticsFilters extends Component {
  render () {
    const {analytics = [], date = new Date(), onChangeDate = Function.prototype} = this.props

    return <div className='pad'>
      <div className='pad'>
        <span><strong>Day</strong> <Flatpickr
          value={new Date(date)}
          onChange={date => {
            onChangeDate(date && date[0])
          }} />
        </span>
      </div>

      <Heatmap analytics={analytics} onChangeDate={day => onChangeDate(day)} showCurrent current={date} />
    </div>
  }
}

class Statistics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: undefined
    }
  }
  changeDate (date) {
    const {actions} = this.props

    let dateString = toISOSubstring(date)
    this.setState({
      date: dateString
    })
    actions.apiGetPomodorosForDay(dateString)
    actions.apiGetTodosForDay(dateString)
    actions.apiGetAnalytics()
    window.history.pushState(null, document.title, window.location.pathname + `?date=${dateString}`)
  }

  render () {
    const {api, user, loading, subscription, actions} = this.props

    if (!user || !user.hasActiveSubscription) {
      return <Subscribe user={user} subscription={subscription} actions={actions} />
    }

    const qs = querystring.parse(window.location.search.replace('?', ''))
    const urlDate = qs.date || new Date().toISOString().substring(0, 10)

    let {date} = this.state
    if (!date) {
      date = urlDate
      this.changeDate(date)
    }

    const completedTodos = api.todosForDate.todos
      .filter(Boolean)
      .filter(t => t.completedAt)
    const completedPomodoros = api.pomodorosForDate.pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.completed)
    const allPomodoros = api.pomodorosForDate.pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')

    return <div className='content'>
      <h1 className='title tac'>Statistics for {date}</h1>

      <div className='pad'>
        <StatisticsFilters
          date={date}
          analytics={api.analytics}
          onChangeDate={this.changeDate.bind(this)} />
      </div>

      <br />

      {<div className={`pad ${loading.loadingPomodorosForDate && 'loading'}`}>
        <div>
          {allPomodoros.length > 0 &&
            <PomodorosChart pomodoros={allPomodoros} micro={false} />}

          <div className='columns'>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{allPomodoros.length}</h1> all pomodoros
            </div>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{durationInHours(allPomodoros)}</h1>h all
            </div>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{completedPomodoros.length}</h1> completed pomodoros
            </div>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{durationInHours(completedPomodoros)}</h1>h completed
            </div>
          </div>

          <br />

          {completedTodos.length === 0 && <div className='column pad-v'>
            <div className='tac'>
              You haven't completed any todos.
            </div>
          </div>}

          <br />

          {completedTodos.length > 0 && <div className='column pad-v'>
            <div className='tac'>
              You were also quite productive today, with {completedTodos.length} tasks completed
            </div>
            <div className='pad'>
              <TodoForm showDeleted showNew={false} todos={completedTodos} actions={actions} editable={false} completable={false} deletable={false} showTitles />
            </div>
          </div>}
        </div>
      </div>}
    </div>
  }
}

function durationInHours (pomodoros) {
  const duration = pomodoros.reduce((acc, pomodoro) => {
    if (pomodoro.startedAt && pomodoro.cancelledAt) {
      const diffInMs = Math.abs(new Date(pomodoro.startedAt) - new Date(pomodoro.cancelledAt))
      const diffInPomodoros = diffInMs / (60 * 60 * 1000)
      return acc + diffInPomodoros
      /*
      1 pomo = 1500000ms
             = 1ms
      */
    }
    return acc + pomodoro.minutes / 60
  }, 0)

  return duration.toFixed(2)
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)
