import React, {Component} from 'react'
import './Streak.styl'

export default class Streak extends Component {
  render () {
    const {analysis} = this.props
    const { longest, streaks } = analysis.reduce((streak, curr) => {
      if (curr.pomodoros.length > 0) {
        streak.current += 1
      } else {
        streak.longest = streak.current > streak.longest ? streak.current : streak.longest
        streak.streaks.push(streak.longest)
        streak.current = 0
      }
      return streak
    }, {longest: 0, streaks: [], current: 0})

    const averageStreaks = streaks.reduce((sum, s) => sum + s, 0) / Math.max(streaks.length, 1)

    return <div className='pad'>
      <div>
        <div className='columns'>
          <div className='column pad-v tac'>
            <h1 className='no-m'>{longest}</h1> longest streak
          </div>
          <div className='column pad-v tac'>
            <h1 className='no-m'>{averageStreaks.toFixed(1)}</h1> average streak
          </div>
        </div>
      </div>
    </div>
  }
}
