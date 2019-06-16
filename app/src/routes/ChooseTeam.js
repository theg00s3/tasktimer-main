import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'
import './ChooseTeam.styl'

class Team extends Component {
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
        Please login to use the team pomodoro
      </div>
    }

    return <div className='content'>
      <h1 className='title'><b>Team Pomodoro</b></h1>
      <h1 className='title'>
        <label for='channel-name'>Choose a channel to connect with your colleagues</label>
      </h1>

      <input autofocus type='test' id='channel-name' className='choose-team-input' onKeyDown={this.chooseChannel.bind(this)} placeholder='Channel name' />
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Team)
