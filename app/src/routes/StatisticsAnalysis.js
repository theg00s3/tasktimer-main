import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import * as actions from '../actions'
import './StatisticsAnalysis.styl'
import Subscribe from '../components/Subscribe'
import PomodorosChart from '../components/PomodorosChart'
import Streak from '../components/Streak'
dayjs.extend(utc)
dayjs.extend(weekOfYear)

class Statistics extends Component {
  componentDidMount () {
    const {actions} = this.props
    actions.apiGetAnalysis && actions.apiGetAnalysis()
  }
  render () {
    const {user, api, subscription, loading, actions} = this.props

    if (!user || !user.subscription || user.subscription.status !== 'active') {
      return <Subscribe user={user} subscription={subscription} actions={actions} />
    }

    if (loading.loadingAnalysis) {
      return <div className='content statistics-analysis'>
        <h1 class='title is-1'>
          Loading Analysis
        </h1>
        <div style='height: 200px; width: 100%;'>
          <svg style='height: 100%; width: 100%;' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' preserveAspectRatio='none'>
            <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.6'
              d=' M-32 4 C-24 4 -24 28 -16 28 C-8 28 -8 4 0 4 C8 4 8 28 16 28 C24 28 24 8 32 8 '>
              <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
                dur='100s' repeatCount='indefinite' />
            </path>
            <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.4'
              d=' M-32 12 C-24 12 -24 20 -16 20 C-8 20 -8 12 0 12 C8 12 8 20 16 20 C24 20 24 12 32 12 '>
              <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
                dur='100s' repeatCount='indefinite' />
            </path>
            <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.8'
              d=' M-32 8 C-24 8 -24 24 -16 24 C-8 24 -8 8 0 8 C8 8 8 24 16 24 C24 24 24 8 32 8 '>
              <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
                dur='100s' repeatCount='indefinite' />
            </path>
          </svg>
        </div>
      </div>
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

      <div>
        <Streak analysis={data} />

        {data.map(d => {
          return <div className={`day`} data-title={`${d.day} - ${d.pomodoros.length}`}>
            <strong>{d.day}</strong>
            <br />
            {d.pomodoros.length} pomodoros
            {/* <div className={`amount pomodoros pomodoros-${d.pomodoros.length}`} style={`z-index: 11000; width: ${d.percentagePomodoros * 100}%`}>
              <div className='hover-content'>
                {d.pomodoros.map(t => {
                  return <div><strong>- {t.startedAt}</strong></div>
                })}
              </div>
            </div> */}

            <PomodorosChart pomodoros={d.pomodoros} micro />

            {d.todos.length} todos
            <div className={`amount todos todos-${d.todos.length}`} style={`z-index: 10000; width: ${d.percentageTodos * 100}%`}>
              {/* <div className='hover-content'>
                {d.todos.map(t => {
                  return <div><strong>- {t.text}</strong></div>
                })}
              </div> */}
            </div>
          </div>
        })}
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
