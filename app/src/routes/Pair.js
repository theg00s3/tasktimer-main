import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Pusher from 'pusher-js'
import * as actions from '../actions'
import TimerButtons from '../components/TimerButtons'
import Timer from '../components/Timer'
Pusher.logToConsole = true

class Pair extends Component {
  componentDidMount () {
    const self = this
    this.channelId = window.location.pathname.replace('/pair/', '')
    this.pusher = new Pusher('d50be9e8b6b4af4885ce', {
      cluster: 'eu',
      forceTLS: true
    })
    this.channel = this.pusher.subscribe(this.channelId)
    this.channel.bind('pusher:subscription_succeeded', () => self.setState({ connected: true }))
    this.channel.bind(`event`, function (data) {
      self.props.actions.startStopTimer(data.body.minutes, data.body.type, true)
    })
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
      <h1 class='title'>#<strong>{this.channelId}</strong></h1>

      <div>
        {this.state.connected ? 'connected' : 'not connected'}
      </div>

      <Timer timer={timer} />
      <TimerButtons actions={actions} pair channelId={this.channelId} />
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
