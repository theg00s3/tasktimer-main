import React, {Component} from 'react'
import './Support.styl'
const logo = require('../assets/images/pomodoro.cc.png')

export default class Support extends Component {
  render () {
    return <div className='content support'>
      <img className='support-image' src={logo} />
      <h1>Pomodoro.cc needs your support!</h1>
      <h3 className='light'>
                Every donation is very much appreciated.
              </h3>
      <h3 className='light'>
                With your support <strong>you</strong> can help us sustain the service costs and make it possible to continue to provide a free service.
              </h3>
      <p>
                We strongly believe in distractions free work and thus decided <strong>to not show ads</strong>.
              </p>
      <a className='action medium' href='https://gratipay.com/pomodoro-cc/' target='_blank'>Support pomodoro.cc!</a>
    </div>
  }
}
