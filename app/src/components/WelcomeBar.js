import React, {Component} from 'react'
import './WelcomeBar.styl'

export default class WelcomeBar extends Component {
  render () {
    const {settings, actions} = this.props
    if (settings.subscribedToFrittata) {
      return null
    }
    return <div className='welcome-bar-container'>
      <div className='welcome-bar tac'>
        <small><i onClick={actions.acknowledgeWelcome} style={{'float': 'right'}} className='icon ion-close-round' tabindex='0'>[x]</i></small>
        <h2 className='no-mt'>Welcome to pomodoro.cc!</h2>
        <p>We can help you to plan your activities for the day, and get things done!</p>
        <p>Pomodoro.cc is a tool that leverages the concepts of the <a href='http://pomodorotechnique.com/' target='_blank'>Pomodoro Technique</a> to help you to keep your focus with mind-refreshing breaks.</p>

        <a href='#start' className='tac cta'>Get started!</a>
      </div>
    </div>
  }
}
