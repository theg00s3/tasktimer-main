import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import * as actions from '../actions'
// import Link from '../components/utils/Link'
import './Login.styl'

class Login extends Component {
  render () {
    return <div className='content'>
      <div className='tac'>
        <p>
          <strong>Login</strong> to <strong>import and export</strong> your pomodoro.cc settings, todos and statistics!
        </p>
          <a href='https://auth.pomodoro.cc/twitter'>twitter!</a>
          <br />
          <a href='https://auth.pomodoro.cc/twitter'>github!</a>
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
    // actions: bindActionCreators(actions, dispatch)
  })
)(Login)
