import React, { Component } from 'react'
import Todo from './Todo'
require('./TodoList.styl')

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
    const deletedTodos = todos.filter(t => t.deleted)
    return <div className='todo-list-container' id='start'>
      <input
        type='text'
        onKeyDown={this.addTodo.bind(this)}
        placeholder='What do you need to do?'
        className='todo-input' />

      <h1>Todo</h1>
      <ul className='todo-list'>
        {newTodos.map((todo) => {
          return <Todo key={todo.id} index={todo.id} todo={todo} todos={todos} actions={actions} />
        })}
      </ul>
      <h1>Done</h1>
      <ul className='todo-list'>
        {doneTodos.map((todo) => {
          return <Todo key={todo.id} index={todo.id} todo={todo} todos={todos} actions={actions} />
        })}
      </ul>
      <h1>Deleted</h1>
      <ul className='todo-list'>
        {deletedTodos.map((todo) => {
          return <Todo key={todo.id} index={todo.id} todo={todo} todos={todos} actions={actions} />
        })}
      </ul>
    </div>
  }
}

export default TodoList
