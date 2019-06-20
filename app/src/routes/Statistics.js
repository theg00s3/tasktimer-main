import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dayjs from 'dayjs'
import querystring from 'querystring'
import utc from 'dayjs/plugin/utc'
import * as actions from '../actions'
import TodoForm from '../components/TodoForm'
import toISOSubstring from '../modules/to-iso-substring'
import PomodorosChart from '../components/PomodorosChart'
import './Statistics.styl'
import Subscribe from '../components/Subscribe'
import 'flatpickr/dist/themes/light.css'
import Flatpickr from 'react-flatpickr'

dayjs.extend(utc)

class StatisticsFilters extends Component {
  render () {
    const {date = new Date(), onChangeDate = Function.prototype, toggleOnlyShowCompleted = Function.prototype} = this.props

    return <div className=''>
      <span>Day <Flatpickr
        value={new Date(date)}
        onChange={date => {
          onChangeDate(date && date[0])
        }} />
      </span>

      &nbsp;
      &nbsp;

      <span className='usn' onClick={() => { toggleOnlyShowCompleted() }}>
        <input type='checkbox' checked={this.props.onlyShowCompleted} />
        only show completed
      </span>

    </div>
  }
}

class Statistics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      onlyShowCompleted: false,
      date: undefined
    }
  }
  changeDate (date) {
    const {actions} = this.props

    let dateString = toISOSubstring(date)
    this.setState({
      date: dateString
    })
    actions.apiGetPomodorosForDay(dateString)
    actions.apiGetTodosForDay(dateString)
    window.history.pushState(null, document.title, window.location.pathname + `?date=${dateString}`)
  }

  render () {
    const {api, user, loading, subscription, actions} = this.props

    if (!user || !user.hasActiveSubscription) {
      return <Subscribe user={user} subscription={subscription} actions={actions} />
    }

    if (loading.loadingPomodorosForDay) {
      return <div className='content tac'>
        loading stats...
      </div>
    }

    const qs = querystring.parse(window.location.search.replace('?', ''))
    const urlDate = qs.date || new Date().toISOString().substring(0, 10)

    let {date} = this.state
    if (!date) {
      date = urlDate
      this.changeDate(date)
    }

    const completedTodos = api.todosForDate.todos
      .filter(Boolean)
      .filter(t => t.completedAt)
    const completedPomodoros = api.pomodorosForDate.pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.completedAt)
      .filter(p => toISOSubstring(p.startedAt) === date)
    const allPomodoros = api.pomodorosForDate.pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => p.startedAt)
      .filter(p => toISOSubstring(p.startedAt) === date)

    return <div className='content'>
      <h1 className='title tac'>Statistics for {date}</h1>

      <div className='pad'>
        <StatisticsFilters
          date={date}
          onChangeDate={this.changeDate.bind(this)}
          onlyShowCompleted={this.state.onlyShowCompleted}
          toggleOnlyShowCompleted={() => this.setState({
            onlyShowCompleted: !this.state.onlyShowCompleted
          })} />

        <PomodorosChart pomodoros={this.state.onlyShowCompleted ? (completedPomodoros || allPomodoros) : allPomodoros} micro={false} />
      </div>

      <br />

      {completedPomodoros.length === 0 && <div className='pad'>
        <div className='columns'>
          <div className='column pad-v tac'>
            <div>
              You haven't completed any pomodoros.
            </div>
          </div>
        </div>
      </div>}

      <br />

      <div className='pad'>
        <div>
          <div className='columns'>
            {completedPomodoros.length > 0 &&
              <div className='column pad-v tac'>
                <h1 className='no-m'>{completedPomodoros.length}</h1> pomodoros
              </div>}
            <div className='column pad-v tac'>
              <h1 className='no-m'>{durationInPomodoros(allPomodoros)}</h1> pomodoros in total
            </div>
          </div>

          <br />

          {completedTodos.length === 0 && <div className='column pad-v'>
            <div className='tac'>
              You haven't completed any todos.
            </div>
          </div>}

          <br />

          {completedTodos.length > 0 && <div className='column pad-v'>
            <div className='tac'>
              You were also quite productive today, with {completedTodos.length} tasks completed
            </div>
          </div>}

          <br />

          {(completedPomodoros.length > 0 || completedTodos.length > 0) && <div className='pad'>
            <TodoForm showDeleted todos={completedTodos} actions={actions} editable={false} completable deletable={false} showTitles />
          </div>}
        </div>
      </div>
    </div>
  }
}

function durationInPomodoros (pomodoros) {
  const duration = pomodoros.reduce((acc, pomodoro) => {
    if (pomodoro.startedAt && pomodoro.cancelledAt) {
      const diffInMs = Math.abs(new Date(pomodoro.startedAt) - new Date(pomodoro.cancelledAt))
      const diffInPomodoros = diffInMs / (25 * 60 * 1000)
      return acc + diffInPomodoros
      /*
      1 pomo = 1500000ms
             = 1ms
      */
    }
    return acc + pomodoro.minutes / 25
  }, 0)

  return duration.toFixed(1)
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Statistics)
