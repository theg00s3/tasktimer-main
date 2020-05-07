import React, { Component } from 'react'
import './About.styl'

export default class About extends Component {
  render () {
    return <div className='content'>
      <div className='welcome-bar'>
        <h1 className='title'>Welcome to Task Timer!</h1>
        <p>We can help you to plan your activities for the day, and get things done!</p>

        <p>
          Task Timer is a tool that leverages the concepts of the Pomodoro Technique
          <br />
          to help you to keep your focus with mind-refreshing breaks.
        </p>

        <p>
          <strong>This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.</strong>
        </p>
        <p>
          <strong>All logos and marks contained herein are the property of their respective owners.</strong>
        </p>
      </div>
    </div>
  }
}
