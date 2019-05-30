import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import querystring from 'querystring'
import {ResponsiveContainer, ComposedChart, Bar, Line, Area, Tooltip} from 'recharts'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import Link from '../components/utils/Link'
import TodoForm from '../components/TodoForm'
import './Statistics.styl'
dayjs.extend(utc)

class Statistics extends Component {
  render () {
    const {user, todos, pomodoros, distractions} = this.props

    if (!user || (user.username !== 'christian-fei' && user.username !== 'christian_fei')) return null

    const qs = querystring.parse(window.location.search.replace('?', ''))

    const date = qs.date || new Date().toISOString().substring(0, 10)
    const today = new Date().toISOString().substring(0, 10)

    let dayBefore = dayjs(date).subtract(0, 'day').toISOString().substr(0, 10)
    let dayAfter = dayjs(date).add(2, 'day').toISOString().substr(0, 10)

    if (!qs.date) {
      window.history.pushState(null, document.title, window.location.pathname + `?date=${date}`)
    }

    const completedTodos = todos
      .filter(Boolean)
      .filter(t => t.completed)
      .filter(t => t.completed_at)
      .filter(t => new Date(t.completed_at).toISOString().substring(0, 10) === date)
    const completedPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro' && p.completed && p.startedAt)
      .filter(p => new Date(p.startedAt).toISOString().substring(0, 10) === date)

    const trackedDistractions = distractions.tracked.filter(d => new Date(d).toISOString().substring(0, 10) === date)

    const pomodorosChartData = pomodorosChartDataFor(completedPomodoros)
    const distractionsChartData = distractionsChartDataFor(trackedDistractions)

    const composedData = pomodorosChartData.reduce((acc, pomodoroItem) => {
      const distractionItem = distractionsChartData.find(({key}) => key === pomodoroItem.key)
      if (distractionItem) {
        Object.assign(pomodoroItem, distractionItem)
      }
      return acc.concat([pomodoroItem])
    }, [])

    console.log('completedTodos', completedTodos)

    return <div className='content'>
      <h1 className='title'>Statistics for {date}</h1>
      <Link to={`/statistics?date=${dayBefore}`} className='statistics-nav-button'>&lt; {dayBefore}</Link>
      {(date !== today)
        ? <Link to={`/statistics?date=${dayAfter}`} className='statistics-nav-button float-right'>{dayAfter} &gt;</Link> : null}
      <div className='pad'>
        <div class='columns'>
          <div class='column pad-v tac'>
            {completedPomodoros.length === 0 && <div>
              You haven't completed any pomodoros.
            </div>}
          </div>
        </div>
      </div>
      {completedPomodoros.length > 0 &&
      <div className='pad'>
        <ResponsiveContainer width='100%' height={200}>
          <ComposedChart data={composedData}>
            <Tooltip labelFormatter={(value, name, props) => pomodorosChartData[value] && pomodorosChartData[value].key} />
            <Bar dataKey='distractionsCount' barSize={20} fill='#413ea0' />
            <Line type='monotone' dataKey='pomodorosCount' dot={false} stroke='#DF2E2E' strokeWidth={3} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>}
      {completedPomodoros.length > 0 && <div className='pad'>
        <div>
          <div class='columns'>
            <div class='column pad-v tac'>
              <h1 class='no-m'>{completedPomodoros.length}</h1> pomodoros
            </div>
            <div class='column pad-v tac'>
              <h1 class='no-m'>{trackedDistractions.length}</h1>
              distractions
            </div>
          </div>
        </div>
      </div>}
      <div className='pad'>
        <div class='columns'>
          <div class='column pad-v tac'>
            {completedTodos.length === 0 ? 'No tasks completed' : `You were also quite productive today, with ${completedTodos.length} tasks completed`}
            <pre>
              {/* {JSON.stringify(completedTodos, null, 2)} */}
            </pre>
          </div>
        </div>
      </div>
      {completedTodos.length > 0 && <div className='pad'>
        <TodoForm showDeleted todos={completedTodos} actions={actions} editable={false} completable={false} destroyable={false} deletable={false} />
      </div>}
    </div>
  }
}

function pomodorosChartDataFor (pomodoros) {
  let pomodorosByKey = pomodoros.reduce((acc, curr) => {
    const hour = new Date(curr.startedAt).getHours()
    const minute = new Date(curr.startedAt).getMinutes()
    const formattedHalfHour = minute < 30 ? '00' : '30'
    const key = `${hour < 10 ? '0' + hour : hour}:${formattedHalfHour}`
    acc[key] = (acc[key] || []).concat([curr])
    return acc
  }, {})

  pomodorosByKey = fillGaps(pomodorosByKey, pomodoros.map(p => p.startedAt))

  return Object.keys(pomodorosByKey)
  .map(key => {
    const pomodoros = pomodorosByKey[key]
    const pomodorosCount = pomodoros.length
    return {key, pomodorosCount, pomodoros}
  })
  .sort((a, b) => a.key < b.key ? -1 : 1)
}

function distractionsChartDataFor (distractions) {
  let distractionsByKey = distractions.reduce((acc, curr) => {
    const hour = new Date(curr).getHours()
    const minute = new Date(curr).getMinutes()
    const formattedHalfHour = minute < 30 ? '00' : '30'
    const key = `${hour < 10 ? '0' + hour : hour}:${formattedHalfHour}`
    acc[key] = (acc[key] || []).concat([curr])
    return acc
  }, {})

  distractionsByKey = fillGaps(distractionsByKey, distractions)

  return Object.keys(distractionsByKey)
  .map(key => {
    const distractions = distractionsByKey[key]
    const distractionsCount = distractions.length
    return {key, distractionsCount}
  })
  .sort((a, b) => a.key < b.key ? -1 : 1)
}

function range (from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from)
}

function fillGaps (pomodorosByKey, pomodorosStartedAt) {
  const minHour = pomodorosStartedAt.reduce((min, startedAt) => {
    const hour = new Date(startedAt).getHours()
    return min > hour ? hour : min
  }, new Date(pomodorosStartedAt[0]).getHours())
  const maxHour = pomodorosStartedAt.reduce((max, startedAt) => {
    const hour = new Date(startedAt).getHours()
    return max < hour ? hour : max
  }, 0)

  for (const hour of range(minHour, maxHour)) {
    const paddedHour = hour < 10 ? '0' + hour : hour

    if (!pomodorosByKey[`${paddedHour}:00`]) pomodorosByKey[`${paddedHour}:00`] = []
    if (!pomodorosByKey[`${paddedHour}:30`]) pomodorosByKey[`${paddedHour}:30`] = []
  }
  return pomodorosByKey
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  distractions: state.distractions,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Statistics)
