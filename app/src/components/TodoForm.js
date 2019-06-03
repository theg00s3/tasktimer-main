import React, { Component } from 'react'
import Todo from './Todo'
import './TodoForm.styl'
import Link from '../components/utils/Link'

class TodoForm extends Component {
  addTodo (event) {
    if (event.keyCode !== 13) return
    const { actions } = this.props
    const text = ((event.target && event.target.value) || '').trim()
    if (!text) return
    actions.addTodo({
      completed: false,
      text
    })
    event.target.value = ''
  }

  render () {
    const { todos, actions, completable = true, editable = true, deletable = true, showTitles = true, showDeleted = false, showStatsLink = false } = this.props
    const newTodos = todos.filter(t => !t.deleted).filter(t => !t.completed)
    const doneTodos = todos.filter(t => showDeleted ? true : !t.deleted).filter(t => t.completed)

    const percentDone = (doneTodos.length / Math.max(doneTodos.length + newTodos.length, 1) * 100)
    const percentDoneString = percentDone.toFixed(0)
    const percentDoneClass = percentDone <= 33 ? 'percent-done-low' : (percentDone <= 66 ? 'percent-done-mid' : 'percent-done-high')

    return <div className='todo-form-container'>
      {editable && <div className='todo-input-container todo editing'>
        <input
          type='text'
          onKeyDown={this.addTodo.bind(this)}
          autoFocus
          placeholder='What do you need to do?'
          id='todo-input'
          className='todo-input' />
      </div>}

      {showTitles && <h1 className={`no-m ${newTodos.length === 0 ? 'all-done-title' : ''}`}>Todo</h1>}
      {newTodos.length > 0 && renderTodoListWith(newTodos, actions, {completable, editable, deletable})}
      {newTodos.length === 0 && <div className='content'>
        <div className='todo'>
          <span className='text all-done'>All done</span>
        </div>
      </div>}

      {showTitles && <h1 className='no-m'>Done {showStatsLink && <span className='small vam'><Link to='/statistics' className={`percent-done  ${percentDoneClass}`}>{percentDoneString} %</Link> Show in stats</span>}</h1>}
      {renderTodoListWith(doneTodos, actions, {completable, editable, deletable})}
    </div>
  }
}

export default TodoForm

export function renderTodoListWith (todos, actions, {completable = true, editable = true, deletable = true} = {}) {
  return <ul className='todo-form'>
    {todos.map((todo) => {
      return <Todo key={todo.id} index={todo.id} todo={todo} todos={todos} actions={actions} completable={completable} editable={editable} deletable={deletable} />
    })}
  </ul>
}
