require('./TodoList.styl')
const TODO_INPUT = 'TODO_INPUT'
import React, {Component, PropTypes} from 'react'
import {TextField} from 'material-ui'
import Todo from './Todo'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class TodoList extends Component {
  addTodo () {
    const {actions} = this.props
    const text = this.refs[TODO_INPUT].getValue()
    if( !text ) {
      return
    }
    this.refs[TODO_INPUT].clearValue()
    actions.addTodo({
      completed:false,
      text
    })
  }

  render() {
    const {todos, actions} = this.props
    return  <div className="todo-list-container">
              <TextField
                ref={TODO_INPUT}
                onEnterKeyDown={this.addTodo.bind(this)}
                hintText="What do you need to do?"
                hintStyle={{left: "60px",fontSize:"1.3em", textAlign:"center"}}
                fullWidth={true}
                inputStyle={{fontSize:"1.3em", textAlign:"center"}}
                className="todo-input"
                underlineFocusStyle={{borderColor:"grey", textAlign:"center"}}/>

              <ul className="todo-list">
                {todos.map((todo) => {
                  return <Todo key={todo.id} index={todo.id} todo={todo} todos={todos} actions={actions}/>
                })}
              </ul>
            </div>
  }
}
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

export default DragDropContext(HTML5Backend)(TodoList)
