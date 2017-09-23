require('./FouroFour.styl')
import * as actions from '../actions'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class FouroFour extends Component {
  render () {
    return <div className='content'>
      <div className='tac'>
        <h1 className="giant">404!</h1>
        <Link to="/" className="action">
          <h1>
            Start your first pomodoro!
          </h1>
        </Link>

      </div>
    </div>
  }
}

FouroFour.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  pomodoro: PropTypes.object.isRequired,
  timer: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
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
)(FouroFour)
