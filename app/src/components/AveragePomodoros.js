import React, {Component} from 'react'

export default class Heatmap extends Component {
  render () {
    const { analytics } = this.props
    const avgPomodorosPerDay = getAvgPomodorosPerDay(analytics)
    const avgTodosPerDay = getAvgTodosPerDay(analytics)

    return <div className='heatmap-container pad'>
      <div className='columns'>
        <div className='column pad-v tac'>
          <h1 className='no-m'>{avgPomodorosPerDay.toFixed(1)}</h1> avg pomodoros / day
        </div>
        <div className='column pad-v tac'>
          <h1 className='no-m'>{avgTodosPerDay.toFixed(1)}</h1> avg todos / day
        </div>
      </div>
    </div>
  }
}

function getAvgPomodorosPerDay (analytics) {
  return analytics.reduce((sum, a) => sum + a.pomodoros.length, 0) / Math.max(analytics.length, 1)
}

function getAvgTodosPerDay (analytics) {
  return analytics.reduce((sum, a) => sum + a.todos.length, 0) / Math.max(analytics.length, 1)
}
