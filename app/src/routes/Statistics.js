import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import querystring from 'querystring'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import TodoForm from '../components/TodoForm'
import toISOSubstring from '../modules/to-iso-substring'
import PomodorosChart from '../components/PomodorosChart'
import TodosChart from '../components/TodosChart'
import './Statistics.styl'
import 'flatpickr/dist/themes/light.css'
import Flatpickr from 'react-flatpickr'
import Heatmap from '../components/Heatmap'
import LoadingWave from '../components/LoadingWave'

dayjs.extend(utc)

class StatisticsFilters extends Component {
  render () {
    const { analytics = [], date = new Date(), onChangeDate = Function.prototype } = this.props
    return <div className='pad'>
      <Heatmap analytics={analytics} onChangeDate={day => onChangeDate(day)} showCurrent current={date} />

      <div className='pad-v'>
        <span><strong>Select day</strong> <Flatpickr
          value={new Date(date)}
          onChange={date => {
            onChangeDate(date && date[0])
          }} />
        </span>
      </div>
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
    const { actions, api } = this.props
    api.analytics.length === 0 && actions.apiGetAnalytics()

    const dateString = toISOSubstring(date)
    this.setState({
      date: dateString
    })

    window.history.pushState(null, document.title, window.location.pathname + `?date=${dateString}`)
  }

  render () {
    const { api, user, loading, subscription, actions } = this.props
    if (!user) {
      return <div className='content'>
      <div className='tac'>
        <p>
          Please log in.
        </p>
      </div>
    </div>
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

    let { date } = this.state
    if (!date) {
      date = urlDate
      this.changeDate(date)
    }

    const data = api.analytics.find(({ day }) => day === date) || { pomodoros: [], todos: [] }
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

    console.log({ completedTodos })
    let timerangeInHours

    const minDate = Math.min(...completedPomodoros.map(p => +new Date(p.startedAt)))
    const maxDate = Math.max(...completedPomodoros.map(p => +new Date(p.completedAt || p.startedAt)))
    if (completedPomodoros.length > 1) {
      timerangeInHours = dayjs(maxDate).diff(minDate) / 1000 / 60 / 60
    }

    return <div className='content'>
      <h1 className='title tac'>Statistics for {date}</h1>

      <StatisticsFilters
        date={date}
        analytics={api.analytics}
        onChangeDate={this.changeDate.bind(this)} />

      <br />

      {allPomodoros.length > 0 && <div class='tac container'>
        <h1>Activity</h1>
        <ul class='activity'>
          {allPomodoros
              .reduce((acc, p, index, array) => {
                const previous = array[index - 1]
                let idleTimeInMillis
                let idleTimeInMinutes
                if (previous) {
                  const currentStart = +new Date(p.startedAt)
                  // const currentEnd = +new Date(p.cancelledAt ? p.cancelledAt : (+new Date(p.startedAt) + p.minutes * 60 * 1000))
                  const previousEnd = +new Date(previous.cancelledAt ? previous.cancelledAt : (+new Date(previous.startedAt) + previous.minutes * 60 * 1000))

                  idleTimeInMillis = currentStart - previousEnd
                  idleTimeInMinutes = idleTimeInMillis / 1000 / 60
                }
                const start = Math.min(...array.map(p => new Date(p.startedAt)))
                const end = Math.max(...array.map(p => new Date(p.startedAt)))
                const dayDuration = end - start
                const dayDurationInMinutes = parseInt(dayDuration / 1000 / 60, 10)

                return acc.concat([
                  idleTimeInMinutes && <li class='idle-time' style={{width: `${relativeWidth(idleTimeInMinutes, dayDurationInMinutes)}px`}}>
                    <span>{humanizeMillis(idleTimeInMillis)}</span>
                  </li>,
                  <li class='activity-item' style={{width: `${relativeWidth(durationInMinutes(p), dayDurationInMinutes)}px`}}>
                    <span>{humanizeMillis(durationInMillis(p))}</span>
                  </li>
                ].filter(Boolean))
              }, [])
              .map((timelineItem) => {
                return timelineItem
              })}
        </ul>
      </div>}

      {<div className={`pad ${loading.loadingPomodorosForDate && 'loading'}`}>
        <div>
          <div className='columns'>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{allPomodoros.length}<small>p</small></h1>
              completed pomodoros
            </div>
            <div className='column pad-v tac'>
              <h1 className='no-m'>{durationFormatted(allPomodoros)}</h1>
              focus time
            </div>
            {timerangeInHours && <div className='column pad-v tac'>
              <h1 className='no-m'>~ {parseInt(timerangeInHours, 10)}<small>h</small></h1>
              from {hour(minDate)}:{minute(minDate)} to {hour(maxDate)}:{minute(maxDate)}
            </div>}
          </div>

          <br />

          {allPomodoros.length > 0 && <div>
            <strong>Pomodoros for {date}</strong>
            <PomodorosChart pomodoros={allPomodoros} micro={false} />
          </div>}
          {completedTodos.length > 0 && <div>
            <strong>Todos for {date}</strong>
            <TodosChart todos={completedTodos} micro={false} />
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

function durationFormatted (pomodoros) {
  const durationInHours = pomodoros.reduce((acc, pomodoro) => {
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

  const fullHours = parseInt(durationInHours, 10)
  const remainingMinutes = parseInt((durationInHours - fullHours) * 100, 10)

  return `${fullHours}h ${remainingMinutes}min`
}

function relativeWidth (pomodoroDurationInMinutes, wholeDurationInMinutes) {
  return parseInt(pomodoroDurationInMinutes / wholeDurationInMinutes * 100 * 4, 10)
}

function durationInMinutes (p) {
  if (!p.cancelledAt) return p.minutes

  return parseInt((+new Date(p.cancelledAt) - +new Date(p.startedAt)) / 1000 / 60, 10)
}
function durationInMillis (p) {
  if (!p.cancelledAt) return p.minutes

  return parseInt((+new Date(p.cancelledAt) - +new Date(p.startedAt)), 10)
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

function humanizeMillis (ms) {
  if (!ms) return ``
  const hours = ms / (1000 * 60 * 60)
  const wholeHours = parseInt(hours, 10)
  const minutes = ms / (1000 * 60)
  const wholeMinutes = parseInt(minutes, 10)
  // const seconds = (minutes - wholeMinutes) * 60
  // const wholeSeconds = parseInt(seconds, 10)
  // const wholeMillis = parseInt((seconds - wholeSeconds) * 1000, 10)
  let humanString = ``
  if (wholeHours > 0) humanString += `${wholeHours}h `
  if (wholeMinutes > 0) humanString += `${wholeMinutes}min `
  // if (wholeSeconds > 0) humanString += `${wholeSeconds}s `
  // humanString += `${wholeMillis}ms `
  return humanString
}
export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)
