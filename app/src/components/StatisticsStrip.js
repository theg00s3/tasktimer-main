require('./StatisticsStrip.styl')
import React, {Component} from 'react'
import PomodoroUtils from '../modules/PomodoroUtils'

export default class StatisticsStrip extends Component {
  render() {
    let {data} = this.props
    data = data || []
    const fullPomodoriCount = PomodoroUtils.fullPomodoriCount(data)
    const fullPomodoriHours = PomodoroUtils.fullPomodoriHours(data)
    const partialPomodoriCount = PomodoroUtils.partialPomodoriCount(data)
    const partialPomodoriHours = PomodoroUtils.partialPomodoriHours(data)
    return  <div className="statistics-strip">
              <div className="stat big first">
                <div className="description">DISTRACTION FREE</div>
                <div className="upper">{fullPomodoriCount} pomodori</div>
                <div className="lower">{fullPomodoriHours}h</div>
              </div>
              <div className="stat">
                <div className="description">total</div>
                <div className="upper">{partialPomodoriCount} pomodori</div>
                <div className="lower">{partialPomodoriHours}h</div>
              </div>
            </div>
  }
}
