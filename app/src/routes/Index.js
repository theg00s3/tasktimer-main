import Pomodoro from '../components/Pomodoro'
import TodoList from '../components/TodoList'
import SoundSettings from '../components/SoundSettings'
import TwitterShare from '../components/TwitterShare'
import DailyPulse from '../components/DailyPulse'
import * as actions from '../actions'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class Index extends Component {
  render() {
    const {timer, todos, settings, user, pomodoro, actions, api} = this.props
    return  <div className="content">
              <div className="ovs">
                <DailyPulse data={api.todaysPomodori} width={700}/>
              </div>
              <TwitterShare/>
              <Pomodoro timer={timer} pomodoro={pomodoro} actions={actions}/>
              <SoundSettings settings={settings} actions={actions}/>
              <TodoList todos={todos} actions={actions}/>
              {this.renderLoginInvite()}
            </div>
  }

  renderLoginInvite() {
    const {user} = this.props
    return !user.username
      ? <p className="login-invite">
          <Link to="login">Login or signup</Link> to track your tasks and pomodoros,<br/> it`s totally free!
        </p>
      : null
  }
}

Index.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  pomodoro: PropTypes.object.isRequired,
  timer: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer,
    user: state.user,
    api: state.api,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions,dispatch)
  })
)(Index)
