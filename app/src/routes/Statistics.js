require('./Statistics.styl')
import * as actions from '../actions'
import LoginLogout from '../components/LoginLogout'
import GenericChart from '../components/GenericChart'
import PomodoroService from '../modules/PomodoroService'
import GraphUtils from '../modules/GraphUtils'
import PomodoroUtils from '../modules/PomodoroUtils'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Statistics extends Component {
  constructor() {
    super()
    this.state = {
      pomodori: undefined,
    }
  }

  componentDidMount() {
    PomodoroService.today()
    .then(this._handlePomodoriResponse.bind(this))

    if( window.development ){
      // this._handlePomodoriResponse({
      //   data: [{"updated_at":"2016-01-03T17:04:18Z","type":"pomodoro","started_at":"2016-01-03T16:56:15.076000Z","minutes":25,"inserted_at":"2016-01-03T17:04:18Z","id":1,"cancelled_at":"2016-01-03T17:04:17.942000Z"},{"updated_at":"2016-01-03T17:09:18Z","type":"break","started_at":"2016-01-03T17:04:17.954000Z","minutes":5,"inserted_at":"2016-01-03T17:09:18Z","id":2,"cancelled_at":null},{"updated_at":"2016-01-03T17:37:05Z","type":"pomodoro","started_at":"2016-01-03T17:12:04.582000Z","minutes":25,"inserted_at":"2016-01-03T17:37:05Z","id":3,"cancelled_at":null},{"updated_at":"2016-01-03T17:42:27Z","type":"pomodoro","started_at":"2016-01-03T17:42:24.030000Z","minutes":25,"inserted_at":"2016-01-03T17:42:27Z","id":4,"cancelled_at":"2016-01-03T17:42:27.295000Z"},{"updated_at":"2016-01-03T17:42:44Z","type":"pomodoro","started_at":"2016-01-03T17:12:04.582000Z","minutes":25,"inserted_at":"2016-01-03T17:42:44Z","id":5,"cancelled_at":null},{"updated_at":"2016-01-03T17:47:33Z","type":"break","started_at":"2016-01-03T17:42:32.654000Z","minutes":5,"inserted_at":"2016-01-03T17:47:33Z","id":6,"cancelled_at":null},{"updated_at":"2016-01-03T18:09:47Z","type":"pomodoro","started_at":"2016-01-03T17:49:46.318000Z","minutes":25,"inserted_at":"2016-01-03T18:09:47Z","id":7,"cancelled_at":"2016-01-03T18:09:46.891000Z"},{"updated_at":"2016-01-03T18:14:47Z","type":"break","started_at":"2016-01-03T18:09:46.905000Z","minutes":5,"inserted_at":"2016-01-03T18:14:47Z","id":8,"cancelled_at":null},{"updated_at":"2016-01-03T18:54:42Z","type":"pomodoro","started_at":"2016-01-03T18:43:41.126000Z","minutes":25,"inserted_at":"2016-01-03T18:54:42Z","id":9,"cancelled_at":"2016-01-03T18:54:42.305000Z"},{"updated_at":"2016-01-03T19:20:13Z","type":"pomodoro","started_at":"2016-01-03T18:55:13.879000Z","minutes":25,"inserted_at":"2016-01-03T19:20:13Z","id":10,"cancelled_at":null},{"updated_at":"2016-01-03T19:33:54Z","type":"break","started_at":"2016-01-03T19:31:41.868000Z","minutes":5,"inserted_at":"2016-01-03T19:33:54Z","id":11,"cancelled_at":null},{"updated_at":"2016-01-03T19:46:22Z","type":"break","started_at":"2016-01-03T19:44:08.054000Z","minutes":5,"inserted_at":"2016-01-03T19:46:22Z","id":12,"cancelled_at":null},{"updated_at":"2016-01-03T20:13:38Z","type":"pomodoro","started_at":"2016-01-03T19:51:24.518000Z","minutes":25,"inserted_at":"2016-01-03T20:13:38Z","id":13,"cancelled_at":null},{"updated_at":"2016-01-03T20:19:48Z","type":"break","started_at":"2016-01-03T20:17:34.513000Z","minutes":5,"inserted_at":"2016-01-03T20:19:48Z","id":14,"cancelled_at":null},{"updated_at":"2016-01-03T20:45:07Z","type":"pomodoro","started_at":"2016-01-03T20:22:52.602000Z","minutes":25,"inserted_at":"2016-01-03T20:45:07Z","id":15,"cancelled_at":null},{"updated_at":"2016-01-03T21:14:53Z","type":"pomodoro","started_at":"2016-01-03T20:52:36.308000Z","minutes":25,"inserted_at":"2016-01-03T21:14:53Z","id":16,"cancelled_at":null},{"updated_at":"2016-01-03T21:20:05Z","type":"break","started_at":"2016-01-03T21:17:48.486000Z","minutes":5,"inserted_at":"2016-01-03T21:20:05Z","id":17,"cancelled_at":null},{"updated_at":"2016-01-03T22:07:45Z","type":"pomodoro","started_at":"2016-01-03T21:45:27.163000Z","minutes":25,"inserted_at":"2016-01-03T22:07:45Z","id":18,"cancelled_at":null},{"updated_at":"2016-01-03T22:22:02Z","type":"break","started_at":"2016-01-03T22:21:57.776000Z","minutes":5,"inserted_at":"2016-01-03T22:22:02Z","id":19,"cancelled_at":"2016-01-03T22:22:02.162000Z"},{"updated_at":"2016-01-03T22:27:02Z","type":"break","started_at":"2016-01-03T22:22:02.814000Z","minutes":5,"inserted_at":"2016-01-03T22:27:02Z","id":20,"cancelled_at":null}]
      // })
    }
  }

  _handlePomodoriResponse(response) {
    const pomodori = response.data
    this.setState({pomodori})
  }

  render() {
    const {timer, todos, settings, user, pomodoro, actions} = this.props
    if( window.development ){
      return this.renderAuthorizedContent()
    }

    return user.username ? this.renderAuthorizedContent() : this.renderUnauthorizedContent()
  }

  renderAuthorizedContent() {
    let {pomodori} = this.state
    pomodori = pomodori || []
    const pomodoriCount = PomodoroUtils.pomodoriCount(pomodori)
    const pomodoriHours = PomodoroUtils.pomodoriHours(pomodori)
    let content = <p className="content alert">
                    Not enough data.. :(
                  </p>

    if( pomodori.length > 0 ) {
      content = <div>
                  <h2>{pomodoriCount} pomodori &tilde; {pomodoriHours}h</h2>
                  <div className="ovs">
                    <GenericChart data={pomodori}/>
                  </div>
                </div>

    }

    return  <div className="tac">
              <h2>Work in progress</h2>
              <p>
                Stay up to date with the latest development
                on <a href="https://twitter.com/pomodoro_cc" target="_blank">Twitter</a>
              </p>
              {content}
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
