import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'
import './Statistics.styl'

import {LineChart, AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

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
          <ul>
            {completedPomodoros.map(p => <li>{JSON.stringify(p)}</li>)}
          </ul>

          <LineChart width={500} height={100} data={chartData}>
            {/* <XAxis dataKey='hour' /> */}
            {/* <YAxis /> */}
            {/* <CartesianGrid stroke='#eee' /> */}
            <Line type='monotone' dataKey='number' stroke='#DF2E2E' strokeWidth={3} />
          </LineChart>
          {/*
          <AreaChart width={500} height={100} data={x}>
            <Area type='monotone' dataKey='number' fill='#DF2E2E' stroke='#DF2E2E' strokeWidth={2} />
          </AreaChart>
          */}
        </div>}
      </div>}
    </div>
  }
}

function chartDataFor (pomodoros) {
  const pomodorosByHour = pomodoros.reduce((acc, curr) => {
    const hour = new Date(curr.started_at).getHours()
    const minute = new Date(curr.started_at).getMinutes()
    const formattedHalfHour = minute < 30 ? '00' : '30'
    const formattedHour = `${hour < 10 ? '0' + hour : hour}:${formattedHalfHour}`
    acc[formattedHour] = (acc[formattedHour] || []).concat([curr])
    return acc
  }, {})

  return Object.keys(pomodorosByHour).map(hour => {
    const pomodoros = pomodorosByHour[hour]
    const number = pomodoros.length
    return {hour, number, pomodoros}
  })
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
