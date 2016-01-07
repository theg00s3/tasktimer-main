require('./Todo.styl')
import React, {Component, PropTypes} from 'react'

const ESCAPE_KEY = 27
const ENTER_KEY = 13


export default class Todo extends Component {
  constructor() {
    super()
    this.state = {
      editing: false
    }
  }

  startEditing() {
    const {todo} = this.props
    this.setState({editing: true, editText: todo.text})
    this.findDOMNode(this.refs.editField).focus()
  }

  onBlur() {
    this.setState({editing: false, editText: ''})
  }

  onChange(event) {
    const editText = event.target.value
    this.setState({editText})
  }

  onKeyDown(event) {
    const {todo, actions} = this.props
    switch(event.keyCode){
      case ENTER_KEY: {
        actions.updateTodo({
          ...todo,
          text: this.state.editText
        })
      }
      case ESCAPE_KEY: {
        this.onBlur()
      }
    }
  }

  render() {
    const {todo, actions} = this.props
    let className = 'todo ' + (todo.completed?'completed ':'')
    className += (this.state.editing ? 'editing ': '')

    return  <li className={className}>
              <div className="normal-view">
                <input id={`todo-${todo.id}`} type="checkbox"
                  defaultChecked={todo.completed}
                  checked={todo.completed}
                  onClick={()=>actions.toggleCompleteTodo(todo)}/>
                <label htmlFor={`todo-${todo.id}`} className="toggle"/>
                <label className="text" onClick={this.startEditing.bind(this)}>{todo.text}</label>
                <button
                  className="destroy"
                  onClick={()=>actions.deleteTodo(todo)}></button>
              </div>
              <div className="edit-view">
                <input ref="editField"
                  className="edit"
                  value={this.state.editText}
                  onBlur={this.onBlur.bind(this)}
                  onChange={this.onChange.bind(this)}
                  onKeyDown={this.onKeyDown.bind(this)}/>
              </div>
            </li>
  }
}
Todo.propTypes = {
  actions: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
}
