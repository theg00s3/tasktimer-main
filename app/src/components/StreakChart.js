import React, {Component} from 'react'
import {
  ResponsiveContainer, LineChart, Line
} from 'recharts'

export default class Streak extends Component {
  render () {
    const {analytics} = this.props

    return <ResponsiveContainer
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
  }
}
