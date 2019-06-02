import React, {Component} from 'react'
import {connect} from 'react-redux'
import Twitter from '../assets/images/twitter.svg'
import Github from '../assets/images/github.svg'

class Login extends Component {
  render () {
    const baseUrl = /pomodoro/.test(window.location.hostname) ? 'https://api.pomodoro.cc' : 'http://localhost:3000'
    const twitterUrl = baseUrl + '/twitter'
    const githubUrl = baseUrl + '/github'
    console.log({twitterUrl, githubUrl})

    return <div className='login content'>
      <table>
        <tr>
          <td className='tac' style='width: 50%'>
            <a href={twitterUrl}>
              <img src={Twitter} />
              twitter
            </a>
          </td>
          <td className='tac' style='width: 50%'>
            <a href={githubUrl}>
              <img src={Github} />
              github
            </a>
          </td>
        </tr>
      </table>
    </div>
  }
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoro: state.pomodoro,
    timer: state.timer
  }),
  (dispatch) => ({
  })
)(Login)
