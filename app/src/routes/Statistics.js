/* eslint-disable camelcase */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Pomodoro from '../models/Pomodoro'
import * as actions from '../actions'
import {renderTodoListWith} from '../components/TodoList'
require('./Statistics.styl')

class Statistics extends Component {
  render () {
    global.stripePopup.open({
      name: 'pomodoro.cc name',
      description: 'pomodoro.cc description',
      zipCode: true,
      currency: 'eur',
      closed: () => {
        debugger
      }
    })

    const {todos, pomodoros} = this.props
    const todaysTodos = todos.filter(t => isToday(t.completed_at)).filter(t => !t.deleted)
    const todaysPomodoros = pomodoros.filter(t => isToday(t.started_at))
    const completed = todaysTodos.reduce((acc, todo) => todo.completed ? acc + 1 : acc, 0)
    return <div className='content statistics'>
      <h1>Your statistics!</h1>

      <h2>Completed today: {completed}</h2>
      {renderTodoListWith(todaysTodos, actions, {completable: false, editable: false, deletable: false})}

      <h2>Pomodoros: {todaysPomodoros.length}</h2>
      {todaysPomodoros.map(p => {
        const pomo = new Pomodoro(p)
        const className = `pomodoro-statistics ${pomo.type} `
        return <div className={className}>
          {<div>
            <strong>Duration:</strong> {pomo.duration() / 1000 / 60}minutes
          </div>}
          <pre>{JSON.stringify(p, null, 1)}</pre>
        </div>
      })}
    </div>
  }
}

function isToday (date) {
  const today = new Date().toDateString()
  if (typeof date === 'string') date = new Date(date)
  return date && date.toDateString && date.toDateString() === today
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    pomodoros: state.pomodoros,
    timer: state.timer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(Statistics)
