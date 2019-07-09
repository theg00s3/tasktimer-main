import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import * as actions from '../actions'
import './StatisticsAnalysis.styl'
import Subscribe from '../components/Subscribe'
dayjs.extend(utc)
dayjs.extend(weekOfYear)

class Statistics extends Component {
  componentDidMount () {
    const {actions} = this.props
    actions.apiGetAnalysis && actions.apiGetAnalysis()
  }
  render () {
    const {user, api, subscription, actions} = this.props

    if (!user || !user.subscription || user.subscription.status !== 'active') {
      return <Subscribe user={user} subscription={subscription} actions={actions} />
    }

    let data = (api.analysis || []).slice(0)

    if (data.length < 2) {
      return <div className='content'>
        <h1 class='title is-1'>
          Not enough data, start a few timers today and please come back tomorrow.
        </h1>
      </div>
    }

    const dataWithEmptyDays = getDataWithEmptyDays(data)

    return <div className='content'>
      <h1 className='title is-1'>Analysis</h1>

      {dataWithEmptyDays.map(d => {
        return <div className={`day`} data-title={`${d.day} - ${d.pomodoros.length}`}>
          <strong>{d.day}</strong>
          <br />
          {d.pomodoros.length} pomodoros
          <div className={`amount pomodoros-${d.pomodoros.length}`} style={`width: ${d.percentage * 100}%`} />
        </div>
      })}
    </div>
  }
}

function getDataWithEmptyDays (data) {
  const datesList = []
  data.sort((a, b) => a.day.localeCompare(b.day))
  const start = dayjs(data[0].day)
  const end = dayjs(data[data.length - 1].day)
  const diffInDays = Math.abs(end.diff(start, 'day'))
  for (let i = 1; i <= diffInDays + 1; i++) {
    const day = start.add(i, 'days')
    datesList.push(day.toISOString().substr(0, 10))
  }
  const dataWithEmptyDays = datesList.reduce((acc, day) => {
    const daily = data.find(d => d.day === day) || { day: day, pomodoros: [] }
    return acc.concat([daily])
  }, [])

  const max = Math.max(...dataWithEmptyDays.map(d => d.pomodoros.length))
  return dataWithEmptyDays.map(d => Object.assign(d, {
    percentage: d.pomodoros.length / max
  }))
  .sort((a, b) => b.day.localeCompare(a.day))
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)

function testData () {
  let data = [{
    day: '2019-07-08',
    pomodoros: [{}]
  }, {
    day: '2019-07-05',
    pomodoros: [{}, {}]
  }, {
    day: '2019-07-04',
    pomodoros: [{}, {}, {}, {}]
  }, {
    day: '2019-06-20',
    pomodoros: [{}, {}, {}]
  }, {
    day: '2019-06-01',
    pomodoros: [{}, {}]
  }, {
    day: '2019-05-25',
    pomodoros: [{}, {}, {}, {}]
  }, {
    day: '2019-05-01',
    pomodoros: [{}, {}]
  }]
  return data
}
