import React, {Component} from 'react'
import './Heatmap.styl'

export default class Heatmap extends Component {
  render () {
    const { analytics, onChangeDate } = this.props
    return <div className='heatmap-container'>
      {onChangeDate && <strong>Click on any square below to see the daily stats</strong>}
      <div className='heatmap'>
        {analytics.map(a => {
          return <span className='tooltip' onClick={() => onChangeDate && onChangeDate(a.day)} title={a.day} data-value={a.pomodoros.length}>
            &nbsp;
            {/* <span className='tooltip-content'>{a.day} {a.pomodoros.length}</span> */}
          </span>
        })}
      </div>
    </div>
  }
}
