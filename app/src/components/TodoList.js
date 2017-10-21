import React, { Component } from 'react'
import Todo from './Todo'
import './TodoList.styl'

class TodoList extends Component {
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
    const { todos, actions } = this.props
    const newTodos = todos.filter(t => !t.completed).filter(t => !t.deleted)
    const doneTodos = todos.filter(t => t.completed).filter(t => !t.deleted)
    return <div className='todo-list-container'>
      <input
        type='text'
        onKeyDown={this.addTodo.bind(this)}
        placeholder='What do you need to do?'
        className='todo-input' />

      <h1>Todo</h1>
      {renderTodoListWith(newTodos, actions)}
      <h1>Done</h1>
      {renderTodoListWith(doneTodos, actions)}
    </div>
  }
}

export default TodoList

export function renderTodoListWith (todos, actions, {completable, editable, deletable} = {completable: true, editable: true, deletable: true}) {
  return <ul className='todo-list'>
    {todos.map((todo) => {
      return <Todo key={todo.id} index={todo.id} todo={todo} todos={todos} actions={actions} completable={completable} editable={editable} deletable={deletable} />
    })}
  </ul>
}
