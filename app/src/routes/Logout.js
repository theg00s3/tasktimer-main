import React, {Component} from 'react'
import * as actions from '../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './Logout.styl'

class Logout extends Component {
  componentDidMount () {
    const {logoutUser} = this.props.actions
    logoutUser()
  }
  render () {
    return <div className='content'>
      <div className='tac'>
        <p>
          Successfully logged out!
        </p>
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
    actions: bindActionCreators(actions, dispatch)
  })
)(Logout)
