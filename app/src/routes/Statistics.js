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
import Signup from '../components/Signup'
import 'flatpickr/dist/themes/light.css'
import Flatpickr from 'react-flatpickr'
import Heatmap from '../components/Heatmap'
import LoadingWave from '../components/LoadingWave'

dayjs.extend(utc)

class StatisticsFilters extends Component {
  render () {
    const {analytics = [], date = new Date(), onChangeDate = Function.prototype} = this.props

    return <div className='pad'>
      <div className='pad-v'>
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
    const {actions, api} = this.props
    api.analytics.length === 0 && actions.apiGetAnalytics()

    let dateString = toISOSubstring(date)
    this.setState({
      date: dateString
    })

    window.history.pushState(null, document.title, window.location.pathname + `?date=${dateString}`)
  }

  render () {
    const {api, user, loading, subscription, actions} = this.props

    if (!user || !user.hasActiveSubscription) {
      return <Signup user={user} subscription={subscription} actions={actions} />
    }

    if (loading.loadingAnalytics && api.analytics.length === 0) {
      return <div className='content tac statistics-analytics'>
        <h1 class='title is-1'>
          Loading Statistics
        </h1>
        <LoadingWave />
      </div>
    }

    const qs = querystring.parse(window.location.search.replace('?', ''))
    const urlDate = qs.date || new Date().toISOString().substring(0, 10)

    let {date} = this.state
    if (!date) {
      date = urlDate
      this.changeDate(date)
    }

    const data = api.analytics.find(({day}) => day === date) || {pomodoros: [], todos: []}
    const todosForDate = data.todos
    const pomodorosForDate = data.pomodoros

    const completedTodos = todosForDate
    .filter(Boolean)
    .filter(t => t.completedAt)
    const completedPomodoros = pomodorosForDate
    .filter(Boolean)
    .filter(p => p.completed)
    const allPomodoros = pomodorosForDate
    .filter(Boolean)

    console.log({completedTodos})
    let timerangeInHours

    const minDate = Math.min(...completedPomodoros.map(p => +new Date(p.startedAt)))
    const maxDate = Math.max(...completedPomodoros.map(p => +new Date(p.completedAt || p.startedAt)))
    if (completedPomodoros.length > 1) {
      timerangeInHours = dayjs(maxDate).diff(minDate) / 1000 / 60 / 60
    }

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
          <div className='columns'>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{allPomodoros.length}<small>p</small></h1>
              completed pomodoros
            </div>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{durationInHours(allPomodoros)}<small>h</small></h1>
              focus time
            </div>
            {timerangeInHours && <div className='column pad-v tac'>
              <h1 className='no-m'>{timerangeInHours.toFixed(1)}<small>h</small></h1>
              from {hour(minDate)}:{minute(minDate)} to {hour(maxDate)}:{minute(maxDate)}
            </div>}
          </div>

          <br />

          {allPomodoros.length > 0 && <div>
            <strong>Pomodoros for {date}</strong>
            <PomodorosChart pomodoros={allPomodoros} micro={false} />
          </div>}

          <br />

          {completedTodos.length === 0 && <div className='column'>
            <div className='tac'>
              You haven't completed any todos.
            </div>
          </div>}

          {completedTodos.length > 0 && <div className='column'>
            <div className='columns'>
              <div className='column pad-v tac'>
                completed <strong>{completedTodos.length}</strong> todos
              </div>
              {timerangeInHours && <div className='column pad-v tac'>
                in <strong>{timerangeInHours.toFixed(1)}</strong> h
              </div>}
            </div>

            <div className='pad'>
              <TodoForm showNew={false} showDeleted todos={completedTodos} actions={actions} editable={false} completable={false} deletable={false} showTitles />
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

function pad (number) {
  if (number < 10) return '0' + number
  return number
}

function minute (date) {
  return pad(new Date(date).getMinutes())
}
function hour (date) {
  return pad(new Date(date).getHours())
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)
