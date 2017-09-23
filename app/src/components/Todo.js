require('./Todo.styl')
import {head, filter, propEq} from 'ramda'
import {h, Component} from 'preact'
import {findDOMNode} from 'react-dom'
import { DragSource, DropTarget } from 'preact-dnd'
import flow from 'lodash.flow'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

const todoDragSource = {
  beginDrag(props) {
    return {
      index: props.index,
    }
  }
}

const todoDropTarget = {
  drop(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const dropIndex = props.index

    if (dragIndex === dropIndex) {
      return
    }
    const {actions, todos} = props
    const todo1 = head(filterTodo(dragIndex)(todos))
    const todo2 = head(filterTodo(dropIndex)(todos))
    console.log( todo1, todo2 )
    actions.swapTodo(todo1, todo2)
  }
}

function filterTodo(id){
  return filter(propEq('id', id))
}


class Todo extends Component {
  constructor() {
    super()
    this.state = {
      editing: false
    }
  }

  startEditing() {
    const {todo} = this.props
    this.setState({editing: true, editText: todo.text})
    setTimeout(function() {
      findDOMNode(this.refs.editField).focus()
    }.bind(this), 100)
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
    const {isDragging, connectDragSource, connectDropTarget} = this.props

    let className = 'todo ' + (todo.completed?'completed ':'')
    className += (this.state.editing ? 'editing ': '')

    return  connectDragSource(connectDropTarget(<li className={className} id={`todo-${todo.id}`}>
              <div className="normal-view">
                <span>
                  <input id={`todo-check-${todo.id}`} class="todo-check-checkbox" type="checkbox"
                    defaultChecked={todo.completed}
                    checked={todo.completed}
                    onChange={()=>actions.toggleCompleteTodo(todo)}/>
                  <label htmlFor={`todo-check-${todo.id}`} className="todo-check-toggle"/>
                </span>
                <label className="text" onBlur={this.onBlur.bind(this)} onDoubleClick={this.startEditing.bind(this)}>{todo.text}</label>
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
            </li>))
  }
}


export default flow(
  DropTarget('todo', todoDropTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('todo', todoDragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
)(Todo)
