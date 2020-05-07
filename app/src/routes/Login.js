import React, { Component } from 'react'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Twitter from '../assets/images/twitter.png'
import GitHub from '../assets/images/github.png'
import Google from '../assets/images/google.png'
import './Login.styl'

class Login extends Component {
  render () {
    const baseUrl = window.USE_PROD ? 'https://api.tasktimer.tk' : 'http://localhost:3000'
    const twitterUrl = baseUrl + '/twitter'
    const githubUrl = baseUrl + '/github'
    const googleUrl = baseUrl + '/google'

    return <div className='login content tac'>
      <h1 className='title'>Login. One click. Easy.</h1>
      <h3 className='pad no-signup'>No signup required!</h3>

      <div className='columns'>
        <div className='column tac'>
          <a className='login-button' href={twitterUrl}>
            <img src={Twitter} />
            <br />
            <h3>Login with Twitter</h3>
          </a>
        </div>
        <div className='column tac'>
          <a className='login-button' href={githubUrl}>
            <img src={GitHub} />
            <br />
            <h3>Login with GitHub</h3>
          </a>
        </div>
        <div className='column tac'>
          <a className='login-button' href={googleUrl}>
            <img src={Google} />
            <br />
            <h3>Login with Google</h3>
          </a>
        </div>
      </div>
    </div>
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Login)
