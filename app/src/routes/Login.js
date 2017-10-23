import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Login.styl'

class Login extends Component {
  render () {
    return <div className='content'>
      <div className='tac'>
        <p>
          <strong>Login</strong> to <strong>import and export</strong> your pomodoro.cc settings, pomodoros and todos!
        </p>
        <a href='https://auth.pomodoro.cc/twitter'>twitter!</a>
        <br />
        <a href='https://auth.pomodoro.cc/github'>github!</a>
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
)(Login)
