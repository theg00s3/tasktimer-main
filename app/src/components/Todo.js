import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
require('./Todo.styl')

const ESCAPE_KEY = 27
const ENTER_KEY = 13

class Todo extends Component {
  constructor () {
    super()
    this.state = {
      editing: false
    }
  }

  startEditing () {
    const {todo} = this.props
    this.setState({editing: true, editText: todo.text})
    setTimeout(function () {
      findDOMNode(this.refs.editField).focus()
    }.bind(this), 100)
  }

  onBlur () {
    this.setState({editing: false, editText: ''})
  }

  onChange (event) {
    const editText = event.target.value
    this.setState({editText})
  }

  onKeyDown (event) {
    const {todo, actions} = this.props
    switch (event.keyCode) {
      case ENTER_KEY: {
        actions.updateTodo({
          ...todo,
          text: this.state.editText
        })
        this.onBlur()
        break
      }
      case ESCAPE_KEY: {
        this.onBlur()
        break
      }
    }
  }

  render () {
    const {todo, actions} = this.props

    let className = 'todo ' + (todo.completed ? 'completed ' : '')
    className += todo.deleted ? 'deleted ' : ''
    className += (this.state.editing ? 'editing ' : '')

    return <li className={className} id={`todo-${todo.id}`}>
      <div className='normal-view'>
        <span>
          <input id={`todo-check-${todo.id}`} class='todo-check-checkbox' type='checkbox'
            defaultChecked={todo.completed}
            checked={todo.completed}
            onChange={() => actions.toggleCompleteTodo(todo)} />
          <label htmlFor={`todo-check-${todo.id}`} className='todo-check-toggle' />
        </span>
        <label className='text' onBlur={this.onBlur.bind(this)} onDoubleClick={this.startEditing.bind(this)}>{todo.text}</label>
        <button
          className='destroy'
          onClick={() => actions.toggleDeleteTodo(todo)} />
      </div>
      <div className='edit-view'>
        <input ref='editField'
          className='edit'
          value={this.state.editText}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)} />
      </div>
    </li>
  }
}

export default Todo
