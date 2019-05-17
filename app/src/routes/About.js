import React, {Component} from 'react'
import './About.styl'

export default class About extends Component {
  render () {
    return <div className='content'>
      <div className='welcome-bar'>
        <h1 class='title'>Welcome to pomodoro.cc!</h1>
        <p>We can help you to plan your activities for the day, and get things done!</p>

        <p>
          Pomodoro.cc is a tool that leverages the concepts of the Pomodoro Technique
          <br />
          to help you to keep your focus with mind-refreshing breaks.
        </p>

        <p>
          <strong>This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.</strong>
        </p>

        You can also <a href='https://www.patreon.com/pomodoro_cc' target='_blank'>support us on Patreon!</a>
      </div>
    </div>
  }
}
