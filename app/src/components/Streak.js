import React, {Component} from 'react'
import './Streak.styl'
import StreakChart from './StreakChart'

export default class Streak extends Component {
  render () {
    const {analytics} = this.props

    const { longest, average } = calcStreaks(analytics)

    return <div className='pad'>
      <strong>Below you can see your streak history</strong>
      <StreakChart analytics={analytics} />
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
