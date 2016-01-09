require('./Statistics.styl')
import LoginLogout from '../components/LoginLogout'
import GenericChart from '../components/GenericChart'
import StatisticsStrip from '../components/StatisticsStrip'
import TasksStrip from '../components/TasksStrip'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
const logo = require('../assets/images/pomodoro.cc.png')

class Statistics extends Component {
  render() {
    const {user} = this.props
    if( window.development ){
      return this.renderAuthorizedContent()
    }

    return user.username ? this.renderAuthorizedContent() : this.renderUnauthorizedContent()
  }

  renderAuthorizedContent() {
    const {api} = this.props
    if( api.todaysPomodori.length === 0 ) {
      return  <div className="tac">
                <h2 className="light">Not enough data...</h2>
                <br/>
                <h1>
                  <div className="action1">Stay productive and</div>
                  <Link to="/" className="action">start your first pomodoro!</Link>
                  <span>&nbsp;:)</span>
                </h1>
                <br/>
                <br/>
                <img src={logo} alt="pomodoro.cc" width="100"></img>
              </div>
    }

    return  <div className="tac">
              <div className="ovs">
                <GenericChart data={api.todaysPomodori}/>
              </div>
              <StatisticsStrip data={api.todaysPomodori}/>
              <TasksStrip data={api.todaysCompletedTasks}/>
            </div>
  }

  renderUnauthorizedContent() {
    const {user} = this.props
    return  <div className="content tac">
              <h3>You need to be logged in to see your statistics</h3>
              <p>
                Signup for <strong>free</strong>,
                <br/>
                you are one click away:
              </p>
              <LoginLogout user={user}/>
            </div>
  }
}

Statistics.propTypes = {
  api: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    api: state.api,
    user: state.user,
  }),
  (dispatch) => ({
  })
)(Statistics)
