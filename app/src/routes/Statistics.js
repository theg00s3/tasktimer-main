import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'
import './Statistics.styl'

import {ResponsiveContainer, ComposedChart, LineChart, AreaChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class Statistics extends Component {
  render () {
    const {user, todos, pomodoros, distractions} = this.props
    console.log('todos, pomodoros', todos, pomodoros)

    const date = new Date().toISOString().substring(0, 10)
    console.log('date', date)

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
              You were also <b>quite productive</b> today, with <b>{todos.filter(t => t.completed).length} tasks completed</b>
              <br />
              <ResponsiveContainer width='100%' height={100}>
                <ComposedChart data={composedData}>
                  {/* <XAxis dataKey='key' /> */}
                  {/* <YAxis /> */}
                  <Tooltip labelFormatter={(value, name, props) => pomodorosChartData[value] && pomodorosChartData[value].key} />
                  {/* <Legend /> */}
                  {/* <CartesianGrid stroke='#f5f5f5' /> */}
                  {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                  <Bar dataKey='distractionsCount' barSize={20} fill='#413ea0' />
                  {/* <Line type='monotone' dataKey='pomodorosCount' stroke='#ff7300' /> */}
                  <Line type='monotone' dataKey='pomodorosCount' dot={false} stroke='#DF2E2E' strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ul>
            {completedPomodoros.map(p => <li>{new Date(p.startedAt).toISOString()}</li>)}
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
    // const formattedQuarterHour = minute < 15 ? '00' : (minute < 30 ? '15' : (minute < 45 ? '30' : '45'))
    // const key = `${hour < 10 ? '0' + hour : hour}:${formattedQuarterHour}`
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
    // const formattedQuarterHour = minute < 15 ? '00' : (minute < 30 ? '15' : (minute < 45 ? '30' : '45'))
    // const key = `${hour < 10 ? '0' + hour : hour}:${formattedQuarterHour}`
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
    // if (!pomodorosByKey[`${paddedHour}:15`]) pomodorosByKey[`${paddedHour}:15`] = []
    if (!pomodorosByKey[`${paddedHour}:30`]) pomodorosByKey[`${paddedHour}:30`] = []
    // if (!pomodorosByKey[`${paddedHour}:45`]) pomodorosByKey[`${paddedHour}:45`] = []
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
