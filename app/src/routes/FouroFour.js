import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Link from '../components/utils/Link'
import './FouroFour.styl'

class FouroFour extends Component {
  render () {
    return <div className='content'>
      <div className='tac'>
        <h1 className='giant'>404!</h1>
        <Link to='/' className='action'>
          <h1>
            Start your first pomodoro!
          </h1>
        </Link>

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
)(FouroFour)
