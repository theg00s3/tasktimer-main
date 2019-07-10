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
      return <div className='content statistics-analysis'>
        <h1 class='title is-1'>
          Not enough data, start a few timers today and please come back tomorrow.
        </h1>
      </div>
    }

    return <div className='content statistics-analysis'>
      <h1 className='title is-1'>Analysis</h1>

      The list below shows some stats over the whole history of you on pomodoro.cc

      {data.map(d => {
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

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)
