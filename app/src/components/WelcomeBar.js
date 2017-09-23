require('./WelcomeBar.styl')

import {h, Component} from 'preact'

export default class WelcomeBar extends Component {
  render() {
    const {user, settings, actions} = this.props
    if( settings.acknlowedgedWelcome || user.username ) {
      return  null
    }
    return  <div className="welcome-bar-container">
              <div className="welcome-bar">
                <i onClick={() => actions.acknowledgeWelcome()} style={{"float":"right"}} className="icon ion-close-round"></i>
                <h3>Welcome to pomodoro.cc!</h3>
                <p>We can help you to plan your activities for the day, and get things done!</p>
                <p>Pomodoro.cc is a tool that leverages the concepts of the <a href="http://pomodorotechnique.com/" target="_blank">Pomodoro Technique</a> to help you to keep your focus with mind-refreshing breaks.</p>
                <p>By keeping track of your activities, we can aggregate insightful statistics to help you to become more productive.</p>
              </div>
            </div>
  }
}
