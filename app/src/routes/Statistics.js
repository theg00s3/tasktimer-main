import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'
import './Statistics.styl'

class Statistics extends Component {
  render () {
    const {user, todos, pomodoros} = this.props
    console.log('todos, pomodoros', todos, pomodoros)

    const date = new Date().toISOString().substring(0, 10)
    console.log('date', date)

    const completedPomodoros = pomodoros
      .filter(Boolean)
      .filter(p => p.type === 'pomodoro')
      .filter(p => {
        console.log('new Date(p.started_at).toISOString().substring(0, 10)', new Date(p.started_at).toISOString().substring(0, 10))
        return new Date(p.started_at).toISOString().substring(0, 10) === date
      })
      .filter(p => p.completed)

    return <div className='content'>
      <h1 class='title'>Statistics</h1>
      {user && <div>
        Hello <b>{user.username}</b>
        {completedPomodoros.length === 0 && <div>
          You haven't completed any pomodoros.
        </div>}
        {completedPomodoros.length > 0 && <div>
          You completed <b>{completedPomodoros.length}</b> pomodoros today!
          <ul>
            {completedPomodoros.map(p => <li>{JSON.stringify(p)}</li>)}
          </ul>
        </div>}
      </div>}
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Statistics)
