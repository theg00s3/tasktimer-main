import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Pusher from 'pusher-js'
import * as actions from '../actions'
import Pomodoro from '../components/Pomodoro'
import './Pair.styl'
Pusher.logToConsole = true

class Pair extends Component {
  componentDidMount () {
    const self = this
    this.channelId = window.location.pathname.replace('/pair/', '')
    this.pusher = new Pusher('d50be9e8b6b4af4885ce', { cluster: 'eu', forceTLS: true })
    this.channel = this.pusher.subscribe(this.channelId)
    this.channel.bind('pusher:subscription_succeeded', () =>
      self.setState({ connected: false }))
    this.channel.bind(`event`, (data) =>
      self.props.actions.startStopTimer(data.pomodoro.minutes, data.pomodoro.type, true))
    this.props.actions.getPairStatus(this.channelId)
  }

  componentWillUnmount () {
    console.log('channel.unbind_all', this.channelId)
    this.channel.unbind_all()
  }

  render () {
    const {actions, user, timer} = this.props

    if (!user) {
      return <div className='content'>
        Please login to use the pair pomodoro
      </div>
    }

    return <div className='content'>
      <h1 class='title'>Pair Programming Pomodoro</h1>
      <h1 class='title'>
        #<strong>{this.channelId}</strong>
        {this.state.connected ? <span class='indicator connected'>&nbsp;</span> : <span class='indicator not-connected'>&nbsp;</span>}
      </h1>

      <Pomodoro timer={timer} actions={actions} pair channelId={this.channelId} />
    </div>
  }
}

export default connect(
(state) => ({
  timer: state.timer,
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  distractions: state.distractions,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Pair)
