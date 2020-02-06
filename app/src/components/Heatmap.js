import React, { Component } from 'react'
import './Heatmap.styl'

export default class Heatmap extends Component {
  render () {
    const { analytics, onChangeDate, showCurrent = false, current } = this.props

    if (analytics.length < 3) {
      return null
    }

    const groupedByMonth = analytics.reduce((acc, curr) => {
      const month = new Date(curr.day).getUTCMonth() + 1
      const year = new Date(curr.day).getUTCFullYear()
      const monthYear = `${month}`.padStart(2, '0') + '-' + year
      if (!acc.find(a => a.monthYear === monthYear)) {
        return acc.concat([{
          monthYear,
          data: [curr]
        }])
      }
      return acc.map(a => {
        if (a.monthYear !== monthYear) return a
        return Object.assign(a, {data: a.data.concat(curr)})
      })
    }, [])

    console.log('groupedByMonth', groupedByMonth)

    return <div className='heatmap-container'>
      {/* {onChangeDate && <strong>Click on any square below to see the daily stats</strong>} */}
      <br />
      <div className='heatmap'>
        {(groupedByMonth || []).map(({monthYear, data = []} = {}) => {
          return <div className='month'>
            <h3>{monthYear}</h3>
            {data.map(a => {
              return <span className={`tooltip ${showCurrent && current === a.day && 'current'}`} onClick={() => onChangeDate && onChangeDate(a.day)} title={a.day} data-value={a.pomodoros.length}>
                {a.day.substring(8)}
              </span>
            })}
          </div>
        })}
      </div>
    </div>
  }
}
