import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Pusher from 'pusher-js'
import * as actions from '../actions'
import Pomodoro from '../components/Pomodoro'
import './Pair.styl'
Pusher.logToConsole = true

function getPairStatus (channel) {
  const url = (window.development)
  ? `http://localhost:3000/pair/${channel}/status`
  : `https://api.pomodoro.cc/pair/${channel}/status`

  return window.fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
}

class Pair extends Component {
  componentDidMount () {
    const self = this
    this.channelId = window.location.pathname.replace('/pair/', '')
    this.pusher = new Pusher('7bfb8a4766daf90ea615', { cluster: 'eu', forceTLS: true })
    this.channel = this.pusher.subscribe(this.channelId)

    this.channel.bind('pusher:subscription_succeeded', () =>
      self.setState({ connected: true }))
    this.channel.bind('pusher:subscription_error', () =>
      self.setState({ connected: false }))

    this.channel.bind(`event`, (data) =>
      self.props.actions.startStopTimer(data.pomodoro.minutes, data.pomodoro.type, true))

    getPairStatus(this.channelId)
    .then((pomodoro) => {
      self.props.actions.resumeTimer(pomodoro)
    })
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
      <h1 class='title'><b>Pair Pomodoro</b></h1>
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
