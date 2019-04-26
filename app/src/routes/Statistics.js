import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'

import querystring from 'querystring'

import {ResponsiveContainer, ComposedChart, Bar, Line, Tooltip} from 'recharts'

class Statistics extends Component {
  render () {
    const {user, todos, pomodoros, distractions} = this.props

    const qs = querystring.parse(window.location.search.replace('?', ''))

    const date = qs.date || new Date().toISOString().substring(0, 10)

    const completedTodosCount = todos.filter(t => t.completed).length
    const completedPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => new Date(p.startedAt).toISOString().substring(0, 10) === date)
      .filter(p => p.completed)

    const pomodorosChartData = pomodorosChartDataFor(completedPomodoros)
    const distractionsChartData = distractionsChartDataFor(distractions.tracked)

    const composedData = pomodorosChartData.reduce((acc, pomodoroItem) => {
      const distractionItem = distractionsChartData.find(({key}) => key === pomodoroItem.key)
      if (distractionItem) {
        Object.assign(pomodoroItem, distractionItem)
      }
      return acc.concat([pomodoroItem])
    }, [])

    return <div className='content'>
      <h1 class='title'>Statistics</h1>
      {user && <div>
        Hello <b>{user.username}</b>
        {completedPomodoros.length === 0 && <div>
          You haven't completed any pomodoros.
        </div>}
        {completedPomodoros.length > 0 && <div>
          <div className='columns'>
            <div className='column'>
              You tracked <b>{completedPomodoros.length} pomodoros</b>, and <b>{distractions.tracked.length} distractions</b> today!
              <br />
              You were also <b>quite productive</b> today, with <b>{completedTodosCount} tasks completed</b>
              <br />
              <ResponsiveContainer width='100%' height={100}>
                <ComposedChart data={composedData}>
                  <Tooltip labelFormatter={(value, name, props) => pomodorosChartData[value] && pomodorosChartData[value].key} />
                  <Bar dataKey='distractionsCount' barSize={20} fill='#413ea0' />
                  <Line type='monotone' dataKey='pomodorosCount' dot={false} stroke='#DF2E2E' strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ul>
            {completedPomodoros.map(p => <li>{new Date(p.startedAt).toISOString()}</li>)}
          </ul>
          <ul>
            {distractions.tracked.map(d => <li>{new Date(d).toISOString()}</li>)}
          </ul>
        </div>}
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
