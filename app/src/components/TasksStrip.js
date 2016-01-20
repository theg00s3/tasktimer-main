require('./TasksStrip.styl')
import React, {Component, PropTypes} from 'react'

export default class TasksStrip extends Component {
  render() {
    let {data} = this.props
    data = data || []
    if( data.length === 0 ) {
      return  <div className="tasks-strip">
                <h2>Today you did not track any task as completed :(</h2>
              </div>

    }
    return  <div className="tasks-strip">
              <h1>Completed tasks ({data.length})</h1>
              <div className="todo-list-container">
                <ul className="todo-list">
                  {data.map((task) => <li className="todo" key={task.id}>
                                        <div className="ovh">
                                          <span style={{"float":"left"}}>{task.text}</span>
                                          <span style={{"float":"right", "font-size":"0.8rem"}}>@{task.completed_at}</span>
                                        </div>
                                      </li>
                  )}
                </ul>
              </div>
            </div>
  }
}
TasksStrip.propTypes = {
  data: PropTypes.array.isRequired
}
