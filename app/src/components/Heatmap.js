import React, {Component} from 'react'
import './Heatmap.styl'

export default class Heatmap extends Component {
  render () {
    const { analysis, onChangeDate = Function.prototype } = this.props
    return <div className='heatmap'>
      {analysis.map(a => {
        return <span className='tooltip' onClick={() => onChangeDate(a.day)} title={a.day} data-value={a.pomodoros.length}>
          &nbsp;
          {/* <span className='tooltip-content'>{a.day} {a.pomodoros.length}</span> */}
        </span>
      })}
    </div>
  }
}
