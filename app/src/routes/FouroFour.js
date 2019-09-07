import * as actions from '../actions'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from '../components/utils/Link'

class FouroFour extends Component {
  render () {
    return <div className='content'>
      <div className='tac'>
        <h1 className='giant'>404  🍅 not found</h1>
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
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(FouroFour)
