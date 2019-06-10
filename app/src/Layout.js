import NavigationBar from './components/NavigationBar'
import MainFooter from './components/MainFooter'
import * as actions from './actions'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Layout extends Component {
  render (state, dispatch) {
    const {actions, user, loading, currentUrl} = this.props
    return <div>
      <NavigationBar actions={actions} user={user} loading={loading} currentUrl={currentUrl} />

      <div className='main-content'>
        {this.props.children}
      </div>

      <MainFooter />
    </div>
  }
}

export default connect(
  (state) => {
    return {
      settings: state.settings,
      loading: state.loading,
      user: state.user
    }
  },
  (dispatch) => { return {actions: bindActionCreators(actions, dispatch)} }
)(Layout)
