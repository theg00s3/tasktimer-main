import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import * as actions from '../actions'
import './Analytics.styl'
import PomodorosChart from '../components/PomodorosChart'
import Streak from '../components/Streak'
import Heatmap from '../components/Heatmap'
import AveragePomodoros from '../components/AveragePomodoros'
import Link from '../components/utils/Link'
import LoadingWave from '../components/LoadingWave'
dayjs.extend(utc)
dayjs.extend(weekOfYear)
class Statistics extends Component {
  componentDidMount () {
    const { actions } = this.props
    actions.apiGetAnalytics()
  }

  render () {
    const { user, api, subscription, loading, actions } = this.props
    
    if (!user) {
      return <div className='content'>
      <div className='tac'>
        <p>
          Please log in.
        </p>
      </div>
      </div>
    }
    user.hasActiveSubscription = true
    if (loading.loadingAnalytics && api.analytics.length === 0) {
      return <div className='content tac statistics-analytics'>
        <h1 class='title is-1'>
          Loading Analytics
        </h1>
        <LoadingWave />
      </div>
    }

    const data = api.analytics

    if (data.length < 2) {
      return <div className='content tac statistics-analytics'>
        <h1 class='title is-1'>
          Not enough data, start a few timers today and please come back tomorrow.
        </h1>
      </div>
    }

    return <div className='content tac statistics-analytics'>
      <h1 className='title is-1'>Analytics</h1>

      <div className='pad'>
        <Heatmap analytics={data} onChangeDate={(date) => { window.location.href = `/analytics#${date}` }} />

        <Streak analytics={data} />

        <AveragePomodoros analytics={data} />

        <br />

        <div class='columns'>
          {data.map(d => {
            return <div className='column is-one-third'>
              <div className={`day`} id={d.day} data-title={`${d.day} - ${d.pomodoros.length}`}>
                <strong>{d.day}</strong>
                <br />
                {d.pomodoros.length} pomodoros

                <PomodorosChart pomodoros={d.pomodoros} micro />

                {d.todos.length} todos
                <div className={`amount todos todos-${d.todos.length}`} style={`z-index: 10000; width: ${d.percentageTodos * 100}%`} />
                <span>See <Link to={`/statistics?date=${d.day}`}>stats</Link></span>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)
