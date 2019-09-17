import React, { Component } from 'react'
import {
  ResponsiveContainer, LineChart, Line, Tooltip, XAxis
} from 'recharts'

export default class TodosChart extends Component {
  render () {
    const { todos, micro = false } = this.props
    const todosForChart = todos

    const todosChartData = todosChartDataByHalfHourFor(todosForChart)

    const height = micro ? 30 : 100
    const width = '100%'

    return <ResponsiveContainer
      width={width}
      height={height}>
      <LineChart
        width={width}
        height={height}
        data={todosChartData}>
        <Line
          type='monotone'
          dataKey='value'
          stroke='#DF2E2E'
          strokeWidth={3}
          dot={false}
          animationDuration={500} />

        {!micro && <Tooltip
          labelFormatter={(value, name, props) => todosChartData[value] && todosChartData[value].key} />}
        {/* <XAxis dataKey='key' /> */}
      </LineChart>
    </ResponsiveContainer>
  }
}

function todosChartDataByHalfHourFor (todos) {
  let todosByKey = todos
  .filter(t => t.completedAt)
  .reduce((acc, curr) => {
    const hour = new Date(curr.completedAt).getHours()
    const minute = new Date(curr.completedAt).getMinutes()
    const formattedHalfHour = minute < 30 ? '00' : '30'
    const key = `${hour < 10 ? '0' + hour : hour}:${formattedHalfHour}`
    acc[key] = (acc[key] || []).concat([curr])
    return acc
  }, {})

  todosByKey = fillGaps(todosByKey, todos.map(p => p.completedAt))

  console.log({todosByKey})

  return Object.keys(todosByKey)
    .map(key => {
      const todos = todosByKey[key]
      const duration = durationInPomodoros(todos)
      return { key, duration, todos, name: key, value: duration }
    })
    .sort((a, b) => a.key < b.key ? -1 : 1)
}

function fillGaps (todosByKey, todosCompletedAt) {
  const minHour = todosCompletedAt.reduce((min, completedAt) => {
    const hour = new Date(completedAt).getHours()
    return min > hour ? hour : min
  }, new Date(todosCompletedAt[0]).getHours())
  const maxHour = todosCompletedAt.reduce((max, completedAt) => {
    const hour = new Date(completedAt).getHours()
    return max < hour ? hour : max
  }, 0)

  for (const hour of range(minHour, maxHour)) {
    const paddedHour = hour < 10 ? '0' + hour : hour

    if (!todosByKey[`${paddedHour}:00`]) todosByKey[`${paddedHour}:00`] = []
    if (!todosByKey[`${paddedHour}:30`]) todosByKey[`${paddedHour}:30`] = []
  }
  return todosByKey
}

function range (from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from)
}

function durationInPomodoros (todos) {
  const duration = todos.reduce((acc, pomodoro) => {
    if (pomodoro.completedAt && pomodoro.createdAt) {
      const diffInMs = Math.abs(new Date(pomodoro.completedAt) - new Date(pomodoro.createdAt))
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
