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
    const {actions, api} = this.props

    let dateString = toISOSubstring(date)
    this.setState({
      date: dateString
    })

    api.analytics.length === 0 && actions.apiGetAnalytics()
    window.history.pushState(null, document.title, window.location.pathname + `?date=${dateString}`)
  }

  render () {
    const {api, user, loading, subscription, actions} = this.props

    if (!user || !user.hasActiveSubscription) {
      return <Signup user={user} subscription={subscription} actions={actions} />
    }

    if (loading.loadingAnalytics) {
      return <div className='content tac statistics-analytics'>
        <h1 class='title is-1'>
          Loading Statistics
        </h1>
        <div style='height: 200px; width: 100%;'>
          <svg style='height: 100%; width: 100%;' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' preserveAspectRatio='none'>
            <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.6'
              d=' M-32 4 C-24 4 -24 28 -16 28 C-8 28 -8 4 0 4 C8 4 8 28 16 28 C24 28 24 8 32 8 '>
              <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
                dur='10s' repeatCount='indefinite' />
            </path>
            <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.4'
              d=' M-32 12 C-24 12 -24 20 -16 20 C-8 20 -8 12 0 12 C8 12 8 20 16 20 C24 20 24 12 32 12 '>
              <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
                dur='10s' repeatCount='indefinite' />
            </path>
            <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.8'
              d=' M-32 8 C-24 8 -24 24 -16 24 C-8 24 -8 8 0 8 C8 8 8 24 16 24 C24 24 24 8 32 8 '>
              <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
                dur='10s' repeatCount='indefinite' />
            </path>
          </svg>
        </div>
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
      // .filter(p => p.type === 'pomodoro')
      .filter(p => p.completed)
    const allPomodoros = pomodorosForDate
      .filter(Boolean)
      // .filter(p => p.type === 'pomodoro')

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
              from {new Date(minDate).toISOString().substring(11, 16)} to {new Date(maxDate).toISOString().substring(11, 16)}
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
