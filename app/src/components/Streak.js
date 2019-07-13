import React, {Component} from 'react'
import './Streak.styl'
import {
  ResponsiveContainer, LineChart, Line, Tooltip
} from 'recharts'

export default class Streak extends Component {
  render () {
    const {analytics} = this.props

    const { longest, average } = calcStreaks(analytics)
    const avgPomodorosPerDay = getAvgPomodorosPerDay(analytics)

    return <div className='pad'>
      <strong>Below you can see your streak history</strong>
      <ResponsiveContainer
        width={'100%'}
        height={100}>
        <LineChart
          width={'100%'}
          height={100}
          data={analytics}>
          <Line
            type='monotone'
            dataKey='percentagePomodoros'
            stroke='#DF2E2E'
            strokeWidth={3}
            dot={false}
            animationDuration={500} />
        </LineChart>
      </ResponsiveContainer>
      <br />
      <br />

      <div>
        <div className='columns'>
          <div className='column pad-v tac'>
            <h1 className='no-m'>{longest.toFixed(0)}</h1> longest streak
          </div>
          <div className='column pad-v tac'>
            <h1 className='no-m'>{average.toFixed(1)}</h1> average streak
          </div>
        </div>
        <div className='columns'>
          <div className='column pad-v tac'>
            <h1 className='no-m'>{avgPomodorosPerDay.toFixed(1)}</h1> avg pomodoros / day
          </div>
        </div>
      </div>
    </div>
  }
}

function calcStreaks (analytics) {
  return analytics.reduce((streak, curr) => {
    if (curr.pomodoros.length > 0) {
      streak.current += 1
    } else {
      streak.longest = streak.current > streak.longest ? streak.current : streak.longest
      streak.streaks.push(streak.current)
      streak.average = streak.streaks.reduce((sum, s) => sum + s, 0) / Math.max(streak.streaks.length, 1)
      streak.current = 0
    }
    return streak
  }, {longest: 0, streaks: [], current: 0, average: 0})
}

function getAvgPomodorosPerDay (analytics) {
  return analytics.reduce((sum, a) => sum + a.pomodoros.length, 0) / Math.max(analytics.length, 1)
}
