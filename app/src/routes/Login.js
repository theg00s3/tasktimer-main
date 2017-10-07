import LoginLogout from '../components/LoginLogout'
import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
require('./Login.styl')

class Login extends Component {
  render () {
    const {user} = this.props
    return <div className='content'>
      <div className='tac'>
        <h1>Howdy!</h1>
        <p>Pomodoro.cc is a free service,<br /> that assists you to get things done.</p>
        <p>By logging in we can provide you <br /> statistics based on your progress</p>
      </div>
      <div className='tac'>
        <h4 style={{'margin-bottom': '0'}}>You can login/signup with</h4>
      </div>
      <LoginLogout user={user} />
      <div className='tac' />
    </div>
  }
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer,
    user: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Login)
