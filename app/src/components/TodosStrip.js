import React, {Component} from 'react'
import './TodosStrip.styl'

export default class TodosStrip extends Component {
  render () {
    let {data} = this.props
    data = data || []
    if (data.length === 0) {
      return <div className='todos-strip'>
        <h2>Today you did not track any task as completed :(</h2>
      </div>
    }
    return <div className='todos-strip'>
      <h1>Completed todos ({data.length})</h1>
      <div className='todo-list-container'>
        <ul className='todo-list'>
          {data.map((todo) => <li className='todo' key={todo.id}>
            <div className='ovh'>
              <span style={{'float': 'left'}}>{todo.text}</span>
              <span style={{'float': 'right', 'fontSize': '0.8rem'}}>@{todo.completed_at}</span>
            </div>
          </li>
                  )}
        </ul>
      </div>
    </div>
  }
}
