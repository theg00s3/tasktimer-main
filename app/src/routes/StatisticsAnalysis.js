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
  render () {
    const {user, api, subscription, actions} = this.props

    if (!user || !user.subscription || user.subscription.status !== 'active') {
      return <Subscribe user={user} subscription={subscription} actions={actions} />
    }

    // let data = [{
    //   day: '2019-07-08',
    //   pomodoros: [{}]
    // }, {
    //   day: '2019-07-05',
    //   pomodoros: [{}, {}]
    // }, {
    //   day: '2019-07-04',
    //   pomodoros: [{}, {}, {}, {}]
    // }, {
    //   day: '2019-06-20',
    //   pomodoros: [{}, {}, {}]
    // }, {
    //   day: '2019-06-01',
    //   pomodoros: [{}, {}]
    // }, {
    //   day: '2019-05-25',
    //   pomodoros: [{}, {}, {}, {}]
    // }, {
    //   day: '2019-05-01',
    //   pomodoros: [{}, {}]
    // }]
    let data = (api.analysis || []).slice(0)

    actions.apiGetPomodorosDaily && actions.apiGetPomodorosDaily()

    if (data.length < 2) {
      return <div className='content'>
        <h1 class='title is-1'>
          Not enough data, start a few timers today and please come back tomorrow.
        </h1>
      </div>
    }

    const datesList = []
    const start = dayjs(data[0].day)
    const end = dayjs(data[data.length - 1].day)
    const diffInDays = end.diff(start, 'day')
    for (let i = 1; i <= diffInDays + 1; i++) {
      const day = start.add(i, 'days')
      datesList.push(day.toISOString().substr(0, 10))
    }
    data = datesList.reduce((acc, day) => {
      const daily = data.find(d => d.day === day) || { day: day, pomodoros: [] }
      return acc.concat([daily])
    }, [])

    return <div className='content'>
      <h1 className='title is-1'>Analysis</h1>

      {data.map(d => {
        return <div className={`day pomodoros-${d.pomodoros.length}`}>
          {/* {d.day} - {d.pomodoros.length} */}
        </div>
      })}
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)
