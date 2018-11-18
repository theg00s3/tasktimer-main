import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'
import './Statistics.styl'

import {ResponsiveContainer, LineChart, AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class Statistics extends Component {
  render () {
    const {user, todos, pomodoros} = this.props
    console.log('todos, pomodoros', todos, pomodoros)

    const date = new Date().toISOString().substring(0, 10)
    console.log('date', date)

    const completedPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => new Date(p.started_at).toISOString().substring(0, 10) === date)
      .filter(p => p.completed)

    const chartData = chartDataFor(completedPomodoros)
    console.log('chartData', chartData)

    return <div className='content'>
      <h1 class='title'>Statistics</h1>
      {user && <div>
        Hello <b>{user.username}</b>
        {completedPomodoros.length === 0 && <div>
          You haven't completed any pomodoros.
        </div>}
        {completedPomodoros.length > 0 && <div>
          You completed <b>{completedPomodoros.length}</b> pomodoros today!

          <br />

          <ResponsiveContainer width='100%' height={100}>
            <LineChart width={500} height={100} data={chartData}>
              {/* <XAxis dataKey='key' axisLine={false} tickLine={false} /> */}
              {/*
              <YAxis />
              <CartesianGrid stroke='#eee' />
              <Tooltip />
              */}
              <Line type='monotone' dataKey='number' dot={false} stroke='#DF2E2E' strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          {/*
          <ul>
            {completedPomodoros.map(p => <li>{new Date(p.started_at).toISOString()}</li>)}
          </ul>
          */}
        </div>}
      </div>}
    </div>
  }
}

function chartDataFor (pomodoros) {
  const pomodorosByKey = pomodoros.reduce((acc, curr) => {
    const hour = new Date(curr.started_at).getHours()
    const minute = new Date(curr.started_at).getMinutes()
    const formattedHalfHour = minute < 30 ? '00' : '30'
    const key = `${hour < 10 ? '0' + hour : hour}:${formattedHalfHour}`
    // const formattedQuarterHour = minute < 15 ? '00' : (minute < 30 ? '15' : (minute < 45 ? '30' : '45'))
    // const key = `${hour < 10 ? '0' + hour : hour}:${formattedQuarterHour}`
    acc[key] = (acc[key] || []).concat([curr])
    return acc
  }, {})

  const minHour = pomodoros.reduce((min, {started_at}) => {
    const hour = new Date(started_at).getHours()
    return min > hour ? hour : min
  }, new Date(pomodoros[0].started_at).getHours())
  const maxHour = pomodoros.reduce((max, {started_at}) => {
    const hour = new Date(started_at).getHours()
    return max < hour ? hour : max
  }, 0)

  for (const hour of range(minHour, maxHour)) {
    const paddedHour = hour < 10 ? '0' + hour : hour

    if (!pomodorosByKey[`${paddedHour}:00`]) pomodorosByKey[`${paddedHour}:00`] = []
    // if (!pomodorosByKey[`${paddedHour}:15`]) pomodorosByKey[`${paddedHour}:15`] = []
    if (!pomodorosByKey[`${paddedHour}:30`]) pomodorosByKey[`${paddedHour}:30`] = []
    // if (!pomodorosByKey[`${paddedHour}:45`]) pomodorosByKey[`${paddedHour}:45`] = []
  }

  return Object.keys(pomodorosByKey)
  .map(key => {
    const pomodoros = pomodorosByKey[key]
    const number = pomodoros.length
    return {key, number, pomodoros}
  })
  .sort((a, b) => a.key < b.key ? -1 : 1)
}

function range (from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from)
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Statistics)
