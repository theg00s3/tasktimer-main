import React, {Component} from 'react'
import './Streak.styl'

export default class Streak extends Component {
  render () {
    const {analysis} = this.props

    const { longest, average } = calcStreaks(analysis)

    return <div className='pad'>
      <div>
        <div className='columns'>
          <div className='column pad-v tac'>
            <h1 className='no-m'>{longest.toFixed(0)}</h1> longest streak
          </div>
          <div className='column pad-v tac'>
            <h1 className='no-m'>{average.toFixed(1)}</h1> average streak
          </div>
        </div>
      </div>
    </div>
  }
}

function calcStreaks (analysis) {
  return analysis.reduce((streak, curr) => {
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
