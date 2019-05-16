import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'
import './ChoosePair.styl'

class Pair extends Component {
  chooseChannel (event) {
    if (event.keyCode !== 13) return
    const channel = ((event.target && event.target.value) || '').trim()
    if (!channel) return alert('Please choose a channel')
    window.location.href = window.location.pathname + `/${channel}`
  }
  render () {
    const {user} = this.props

    if (!user) {
      return <div className='content'>
        Please login to use the pair pomodoro
      </div>
    }

    return <div className='content'>
      <h1 class='title'><b>Pair Pomodoro</b></h1>
      <h1 class='title'>
        Choose a channel to connect with your colleagues
      </h1>

      <input type='test' className='choose-pair-input' onKeyDown={this.chooseChannel.bind(this)} placeholder='Channel name' />
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
