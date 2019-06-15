import React, {Component} from 'react'
import {
  ResponsiveContainer, LineChart, Line, Tooltip
} from 'recharts'

export default class PomodorosChart extends Component {
  render () {
    const {pomodoros, micro = false} = this.props
    const pomodorosForChart = pomodoros

    const pomodorosChartData = pomodorosChartDataFor(pomodorosForChart)

    const height = micro ? 30 : 60
    const width = '100%'

    return <ResponsiveContainer
      width={width}
      height={height}>
      <LineChart
        width={width}
        height={height}
        data={pomodorosChartData}>
        <Line
          type='monotone'
          dataKey='value'
          stroke='#DF2E2E'
          strokeWidth={2}
          dot={false}
          animationDuration={800} />
        {!micro && <Tooltip
          labelFormatter={(value, name, props) => pomodorosChartData[value] && pomodorosChartData[value].key} />}
      </LineChart>
    </ResponsiveContainer>
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
    const duration = durationInPomodoros(pomodoros)
    return {key, duration, pomodoros, name: key, value: duration}
  })
  .sort((a, b) => a.key < b.key ? -1 : 1)
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

function range (from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from)
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
