import * as actions from '../actions'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Link from '../components/utils/Link'

class NotFound extends Component {
  render () {
    return <div className='content'>
      <div className='tac'>
        <strong>Not Found</strong>
      </div>
      <div className='tac'>
        <Link to='/'>Get productive</Link>
      </div>
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(NotFound)
