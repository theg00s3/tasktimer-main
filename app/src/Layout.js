import TopBar from './components/TopBar'
import WelcomeBar from './components/WelcomeBar'
import MainFooter from './components/MainFooter'
import NotificationCenter from './modules/NotificationCenter'
import NotificationService from './modules/NotificationService'
import * as actions from './actions'

import React, {Component, PropTypes} from 'react'
import Snackbar from 'material-ui/lib/snackbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Layout extends Component {
  componentDidMount() {
    NotificationCenter.on('pomodoroEnded', this._showPomodoroEndedNotification.bind(this))
    if( this.shouldShowNotificationGrant() ) {
      this.refs.requestNotificationPermissionSnackbar.show()
    }
  }
  shouldShowNotificationGrant() {
    const {settings} = this.props
    return NotificationService.needsPermission && !settings.notificationPermissionGranted
  }
  componentWillUnmount() {
    NotificationCenter.off('pomodoroEnded', this._showPomodoroEndedNotification.bind(this))
  }
  _showPomodoroEndedNotification() {
    this.refs.pomodoroEndedSnackbar.show()
  }
  _requestNotificationPermission() {
    const {actions} = this.props
    const {requestNotificationPermissionSnackbar} = this.refs
    NotificationService.requestPermission(() => {
      actions.grantNotificationPermission(true)
      requestNotificationPermissionSnackbar.dismiss()
    }, () => {
      actions.grantNotificationPermission(false)
    })
  }
  render() {
    const {user, settings, actions} = this.props
    return  <div className="layout">
              <TopBar user={user} actions={actions}/>
              <WelcomeBar user={user} settings={settings} actions={actions}/>

              <div className="main-content">{this.props.children}</div>
              <MainFooter/>
              <Snackbar
                ref="pomodoroEndedSnackbar"
                message="Pomodoro ended!"
                action="Got it"
                autoHideDuration={2000}
                onActionTouchTap={() => {this.refs.pomodoroEndedSnackbar.dismiss()}}/>
              <Snackbar
                ref="requestNotificationPermissionSnackbar"
                message="Pomodoro.cc would like to send you notifications!"
                action="Grant"
                autoHideDuration={0}
                onActionTouchTap={this._requestNotificationPermission.bind(this)}/>
            </div>
  }
}

Layout.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  pomodoro: PropTypes.object.isRequired,
  timer: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(
  (state) => {
    return {
      todos: state.todos,
      settings: state.settings,
      pomodoro: state.pomodoro,
      timer: state.timer,
      user: state.user,
    }
  },
  (dispatch) => {return {actions:bindActionCreators(actions,dispatch)}}
)(Layout)
