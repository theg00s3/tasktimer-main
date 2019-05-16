import React, {Component} from 'react'
import {connect} from 'react-redux'
import Twitter from '../assets/images/twitter.svg'
import Github from '../assets/images/github.svg'

class Login extends Component {
  render () {
    return <div className='login content'>
      <table>
        <tr>
          <td className='tac' style='width: 50%'>
            <a href='https://api.pomodoro.cc/twitter'>
              <img src={Twitter} />
              twitter
            </a>
          </td>
          <td className='tac' style='width: 50%'>
            <a href='https://api.pomodoro.cc/github'>
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
