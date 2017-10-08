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
    return <div className='todo-list-container'>
      <input
        type='text'
        onKeyDown={this.addTodo.bind(this)}
        placeholder='What do you need to do?'
        className='todo-input' />

      <ul className='todo-list'>
        {todos.map((todo) => {
          return <Todo key={todo.id} index={todo.id} todo={todo} todos={todos} actions={actions} />
        })}
      </ul>
    </div>
  }
}

export default TodoList
