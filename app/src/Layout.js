import TopBar from './components/TopBar'
import WelcomeBar from './components/WelcomeBar'
import MainFooter from './components/MainFooter'
import NotificationCenter from './modules/NotificationCenter'
import NotificationService from './modules/NotificationService'
import * as actions from './actions'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Layout extends Component {
  componentDidMount () {
    NotificationCenter.on('pomodoroEnded', console.log.bind(console, 'unhandled: pomodoroEnded'))
    NotificationCenter.on('updateTodo', console.log.bind(console, 'unhandled: updateTodo'))
    if (this.shouldShowNotificationGrant()) {
      this._requestNotificationPermission()
    }
  }
  shouldShowNotificationGrant () {
    const {settings} = this.props
    return NotificationService.needsPermission && !settings.notificationPermissionGranted
  }
  componentWillUnmount () {
    NotificationCenter.off('pomodoroEnded', console.log.bind(console, 'unhandled: pomodoroEnded'))
  }
  render () {
    const {settings, actions} = this.props
    return <div className='layout'>
      <TopBar actions={actions} />
      <WelcomeBar settings={settings} actions={actions} />

      <div className='main-content'>
        {this.props.children}
      </div>
      <MainFooter />
    </div>
  }

  _requestNotificationPermission () {
    const {actions} = this.props
    NotificationService.requestPermission(() => {
      actions.grantNotificationPermission(true)
      this.setState({requestNotificationPermissionSnackbarOpen: false})
    }, () => {
      actions.grantNotificationPermission(false)
    })
  }
}

export default connect(
  (state) => {
    return {
      todos: state.todos,
      settings: state.settings,
      pomodoro: state.pomodoro,
      timer: state.timer
    }
  },
  (dispatch) => { return {actions: bindActionCreators(actions, dispatch)} }
)(Layout)
