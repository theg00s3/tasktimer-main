import React, {Component} from 'react'
import teamPomodoroImage from '../assets/images/team-pomodoro.png'
// import './TeamPomodoroFeature.styl'

export default class TeamPomodoroFeature extends Component {
  render () {
    return <div className='content tac'>
      Please login to use the team pomodoro

      <br />
      <br />

      <h1 className='is-1 title' style='line-height: 1.1'>
        Team Pomodoro
        <br />
        gives you
        <br />
        remote
        <br />
        pair-programming
        <br />
        superpowers
      </h1>

      <br />
      <br />
      You can see it in action below:
      <br />
      <br />

      <img src={teamPomodoroImage} alt='team pomodoro' />
    </div>
  }
}
