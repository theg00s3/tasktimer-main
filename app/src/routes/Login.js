require('./Login.styl')
import LoginLogout from '../components/LoginLogout'
import * as actions from '../actions'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Login extends Component {
  render() {
    const {timer, todos, settings, user, pomodoro, actions} = this.props
    return  <div className="content">
              <div className="tac">
                <h1>Howdy!</h1>
                <p>Pomodoro.cc is a free service,<br/> that assists you to get things done.</p>
                <p>By logging in we can provide you <br/> statistics based on your progress</p>
              </div>
              <div className="tac">
                <h4 style={{"margin-bottom":"0"}}>You can login/signup with</h4>
              </div>
              <LoginLogout user={user}/>
              <div className="tac">
              </div>
            </div>
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  pomodoro: PropTypes.object.isRequired,
  timer: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer,
    user: state.user,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions,dispatch)
  })
)(Login)
