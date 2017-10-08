/* eslint-disable camelcase */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {renderTodoListWith} from '../components/TodoList'
require('./Statistics.styl')

class Statistics extends Component {
  render () {
    const {todos} = this.props
    const todaysTodos = todos.filter(t => {
      const completed_at = new Date(t.completed_at)
      if (isToday(completed_at)) {
        return true
      }
      return false
    })
    const completed = todaysTodos.reduce((acc, todo) => todo.completed ? acc + 1 : acc, 0)
    return <div className='content statistics'>
      <h1>Your statistics!</h1>

      <p><strong>Completed today:</strong> {completed}</p>

      {renderTodoListWith(todaysTodos, actions, {completable: false, editable: false, deletable: false})}
    </div>
  }
}

function isToday (date) {
  const today = new Date().toDateString()
  return date && date.toDateString && date.toDateString() === today
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(Statistics)
