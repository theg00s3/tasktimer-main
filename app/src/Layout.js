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
  constructor() {
    super()
    this.state = {
      requestNotificationPermissionSnackbarOpen: false,
      undoTodoActionSnackbarOpen: false,
      pomodoroEndedSnackbarOpen: false,
    }
  }
  componentDidMount() {
    NotificationCenter.on('pomodoroEnded', this._showPomodoroEndedNotification.bind(this))
    NotificationCenter.on('updateTodo', this._updateTodoNotification.bind(this))
    if( this.shouldShowNotificationGrant() ) {
      this.state.requestNotificationPermissionSnackbarOpen = true
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
    this.state.pomodoroEndedSnackbarOpen = true
  }
  _requestNotificationPermission() {
    const {actions} = this.props
    NotificationService.requestPermission(() => {
      actions.grantNotificationPermission(true)
      this.state.requestNotificationPermissionSnackbarOpen = false
    }, () => {
      actions.grantNotificationPermission(false)
    })
  }
  _updateTodoNotification() {
    this.state.undoTodoActionSnackbarOpen = true
  }
  _undoTodoAction() {
    const {actions} = this.props
    actions.undoTodoAction()
    this.state.undoTodoActionSnackbarOpen = false
  }
  render() {
    const {user, settings, actions} = this.props
    return  <div className="layout">
              <TopBar user={user} actions={actions}/>
              <WelcomeBar user={user} settings={settings} actions={actions}/>

              <div className="main-content">
                {this.props.children}
              </div>
              <MainFooter/>
              <Snackbar
                ref="undoTodoActionSnackbar"
                message="You can undo this"
                action="Undo"
                open={this.state.undoTodoActionSnackbarOpen}
                autoHideDuration={5000}
                onActionTouchTap={this._undoTodoAction.bind(this)}/>
              <Snackbar
                ref="pomodoroEndedSnackbar"
                message="Pomodoro ended!"
                action="Got it"
                open={this.state.pomodoroEndedSnackbarOpen}
                autoHideDuration={2000}
                onActionTouchTap={() => {this.state.pomodoroEndedSnackbarOpen = false}}/>
              <Snackbar
                ref="requestNotificationPermissionSnackbar"
                message="Pomodoro.cc would like to send you notifications!"
                action="Grant"
                open={this.state.requestNotificationPermissionSnackbarOpen}
                autoHideDuration={0}
                onActionTouchTap={() => {this.state.requestNotificationPermissionSnackbarOpen = false}}/>
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
