require('./Statistics.styl')
import * as actions from '../actions'
import LoginLogout from '../components/LoginLogout'
import GenericChart from '../components/GenericChart'
import PomodoroService from '../modules/PomodoroService'
import StatisticsUtils from '../modules/StatisticsUtils'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Statistics extends Component {
  constructor() {
    super()
    this.state = {
      pomodori: undefined,
      pomodoriCount: 0.0
    }
  }

  componentDidMount() {
    PomodoroService.today()
    .then((response) => {
      const pomodori = response.data
      const pomodoriCount = StatisticsUtils.pomodoriCount(pomodori)
      this.setState({pomodori, pomodoriCount})
    })
  }

  render() {
    const {timer, todos, settings, user, pomodoro, actions} = this.props
    return  <div className="content">
              {user.username ? this.renderContent() : this.renderUnauthorizedContent()}
            </div>
  }

  renderContent() {
    let {pomodori, pomodoriCount} = this.state
    pomodori = pomodori || []
    return  <div className="tac">
              <h1>Work in progress</h1>
              <p>
                Stay up to date with the latest development
                on <a href="https://twitter.com/pomodoro_cc" target="_blank">Twitter</a>
              </p>
              <pre>{pomodoriCount}</pre>
              <div className="ovs">
                <GenericChart data={pomodori}/>
              </div>
            </div>
  }

  renderUnauthorizedContent() {
    const {user} = this.props
    return  <div className="tac">
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
)(Statistics)
