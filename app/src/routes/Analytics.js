import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import * as actions from '../actions'
import './Analytics.styl'
import Signup from '../components/Signup'
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
    const {actions, api} = this.props
    api.analytics.length === 0 && actions.apiGetAnalytics()
  }
  render () {
    const {user, api, subscription, loading, actions} = this.props

    if (!user || !user.subscription || user.subscription.status !== 'active') {
      return <Signup user={user} subscription={subscription} actions={actions} />
    }

    if (loading.loadingAnalytics && api.analytics.length === 0) {
      return <div className='content tac statistics-analytics'>
        <h1 class='title is-1'>
          Loading Analytics
        </h1>
        <LoadingWave />
      </div>
    }

    let data = api.analytics

    if (data.length < 2) {
      return <div className='content tac statistics-analytics'>
        <h1 class='title is-1'>
          Not enough data, start a few timers today and please come back tomorrow.
        </h1>
      </div>
    }

    console.log(JSON.stringify(data.map(d => Object.assign(d, {userId: undefined, todos: []}))))

    return <div className='content tac statistics-analytics'>
      <h1 className='title is-1'>Analytics</h1>

      The list below shows some stats over the whole history of you on pomodoro.cc

      <div>
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
                {d.pomodoros.length > 0 && <span>See <Link to={`/statistics?date=${d.day}`}>stats</Link></span>}
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
