import React, {Component} from 'react'
import {connect} from 'react-redux'
import Link from '../components/utils/Link'

class NotFound extends Component {
  render () {
    return <div className='content'>
      <div className='tac'>
        <strong>Not Found</strong>
      </div>
      <div className='tac'>
        <Link to='/'>Get productive</Link>
      </div>
    </div>
  }
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer
  }),
  (dispatch) => ({
  })
)(NotFound)
