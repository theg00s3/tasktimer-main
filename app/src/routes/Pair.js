import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Pusher from 'pusher-js'
import * as actions from '../actions'
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
    this.channel.bind('pusher:subscription_succeeded', function (data) {
      self.setState({
        connected: true
      })
    })
    this.channel.bind(`event`, function (data) {
      console.log('-- event', JSON.stringify(data))
    })
  }

  render () {
    const {actions} = this.props

    return <div className='content'>
      <h1 class='title'>Pair Programming Pomodoro</h1>
      <h1 class='title'>#<strong>{this.channelId}</strong></h1>
      {this.state.connected ? 'connected' : 'not connected'}

      <button onClick={() => actions.sendTestEvent(this.channelId)} className=''>
        send test event
      </button>
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  distractions: state.distractions,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Pair)
