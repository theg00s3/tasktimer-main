import React, {Component} from 'react'
import './Heatmap.styl'

export default class Heatmap extends Component {
  render () {
    const { analytics, onChangeDate, showCurrent = false, current } = this.props
    if (analytics.length < 3) return null
    return <div className='heatmap-container'>
      {onChangeDate && <strong>Click on any square below to see the daily stats</strong>}
      <br />
      <div className='heatmap'>
        {(analytics || []).map(a => {
          return <span className={`tooltip ${showCurrent && current === a.day && 'current'}`} onClick={() => onChangeDate && onChangeDate(a.day)} title={a.day} data-value={a.pomodoros.length}>
            &nbsp;
            {/* <span className='tooltip-content'>{a.day} {a.pomodoros.length}</span> */}
          </span>
        })}
      </div>
    </div>
  }
}
