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
                onRequestClose={this._hideUndoTodoNotification.bind(this)}
                onActionTouchTap={this._undoTodoAction.bind(this)}/>
              <Snackbar
                ref="pomodoroEndedSnackbar"
                message="Pomodoro ended!"
                action="Got it"
                open={this.state.pomodoroEndedSnackbarOpen}
                autoHideDuration={2000}
                onRequestClose={this._hidePomodoroEndedNotification.bind(this)}
                onActionTouchTap={this._hidePomodoroEndedNotification.bind(this)}/>
              <Snackbar
                ref="requestNotificationPermissionSnackbar"
                message="Pomodoro.cc would like to send you notifications!"
                action="Grant"
                open={this.state.requestNotificationPermissionSnackbarOpen}
                autoHideDuration={0}
                onRequestClose={this._hideRequestNotificationPermissionSnackbar.bind(this)}
                onActionTouchTap={this._requestNotificationPermission.bind(this)}/>
            </div>
  }

  _showPomodoroEndedNotification() {
    this.setState({pomodoroEndedSnackbarOpen:true})
  }
  _hideUndoTodoNotification() {
    this.setState({undoTodoActionSnackbarOpen:false})
  }
  _hidePomodoroEndedNotification() {
    this.setState({pomodoroEndedSnackbarOpen:false})
  }
  _hideRequestNotificationPermissionSnackbar() {
    this.setState({requestNotificationPermissionSnackbarOpen: false})
  }
  _requestNotificationPermission() {
    const {actions} = this.props
    NotificationService.requestPermission(() => {
      actions.grantNotificationPermission(true)
      this.setState({requestNotificationPermissionSnackbarOpen:false})
    }, () => {
      actions.grantNotificationPermission(false)
    })
  }
  _updateTodoNotification() {
    this.setState({undoTodoActionSnackbarOpen:true})
  }
  _undoTodoAction() {
    const {actions} = this.props
    actions.undoTodoAction()
    this.setState({undoTodoActionSnackbarOpen:false})
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
