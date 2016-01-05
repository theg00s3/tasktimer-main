require('./Statistics.styl')
import LoginLogout from '../components/LoginLogout'
import GenericChart from '../components/GenericChart'
import StatisticsStrip from '../components/StatisticsStrip'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

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
    let content = <p className="content alert">
                    Not enough data.. :(
                  </p>

    if( api.todaysPomodori.length > 0 ) {
      content = <div>
                  <StatisticsStrip data={api.todaysPomodori}/>
                  <div className="ovs">
                    <GenericChart data={api.todaysPomodori}/>
                  </div>
                </div>

    }

    return  <div className="tac">
              {content}
              <h2>We are working on a better statistics page</h2>
              <p>
                Stay up to date with the latest development and give us feedback
                on <a href="https://twitter.com/pomodoro_cc" target="_blank">Twitter</a>!
              </p>
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
