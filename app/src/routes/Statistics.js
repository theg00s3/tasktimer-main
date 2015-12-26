require('./Statistics.styl')
import * as actions from '../actions'
import d3Scale from 'd3-scale'
import LoginLogout from '../components/LoginLogout'
import PomodoroService from '../modules/PomodoroService'
import PomodoroStatisticsUtils from '../modules/PomodoroStatisticsUtils'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {VictoryChart, VictoryAxis, VictoryLine} from 'victory'

class Statistics extends Component {
  constructor() {
    super()
    this.state = {
      data: undefined
    }
  }

  componentDidMount() {
    PomodoroService.today()
    .then((response) => {
      const data = PomodoroStatisticsUtils.calculatGenericGraphFrom(response.data)
      console.log( '-- data', data )
      this.setState({data})
    })
  }

  render() {
    const {timer, todos, settings, user, pomodoro, actions} = this.props
    return  <div className="content">
              {user.username ? this.renderContent() : this.renderUnauthorizedContent()}
            </div>
  }

  renderContent() {
    const {data} = this.state
    return  <div className="tac">
              <h1>Work in progress</h1>
              <p>
                Stay up to date with the latest development
                on <a href="https://twitter.com/pomodoro_cc" target="_blank">Twitter</a>
              </p>
              <VictoryChart height={300} width={768}>
                <VictoryAxis/>
                <VictoryLine data={data} interpolation="step"/>
              </VictoryChart>
              <VictoryChart height={300} width={768}>
                <VictoryAxis/>
                <VictoryLine data={data} interpolation="monotone"/>
              </VictoryChart>
              <VictoryChart height={300} width={768}>
                <VictoryAxis/>
                <VictoryLine data={data} interpolation="natural"/>
              </VictoryChart>
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
