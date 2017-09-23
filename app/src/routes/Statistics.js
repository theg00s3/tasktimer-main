require('./Statistics.styl')
import LoginLogout from '../components/LoginLogout'
import StatisticsStrip from '../components/StatisticsStrip'
import TodosStrip from '../components/TodosStrip'
import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {Link} from 'react-router'
const logo = require('../assets/images/pomodoro.cc.png')

class Statistics extends Component {
  render () {
    const {user} = this.props
    if (window.development) {
      return this.renderAuthorizedContent()
    }

    return user ? this.renderAuthorizedContent() : this.renderUnauthorizedContent()
  }

  renderAuthorizedContent () {
    const {api} = this.props
    if (api.todaysPomodori.length === 0) {
      return <div className='tac'>
        <h1 className='light'>Not enough data...</h1>
        <br />
        <br />
        <img src={logo} alt='pomodoro.cc' width='100' />
        <br />
        <br />
        <br />
        <Link to='/' className='action'>
          <h1>
                    Start your first pomodoro!
                  </h1>
        </Link>
      </div>
    }

    return <div className='tac'>
      <StatisticsStrip data={api.todaysPomodori} />
      <TodosStrip data={api.todaysCompletedTodos} />
    </div>
  }

  renderUnauthorizedContent () {
    const {user} = this.props
    return <div className='content tac'>
      <h3>You need to be logged in to see your statistics</h3>
      <p>
                Signup for <strong>free</strong>,
                <br />
                you are one click away:
              </p>
      <LoginLogout user={user} />
    </div>
  }
}

export default connect(
  (state) => ({
    api: state.api,
    user: state.user
  }),
  (dispatch) => ({
  })
)(Statistics)
