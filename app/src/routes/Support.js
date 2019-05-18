import React, {Component} from 'react'
import './Support.styl'
import Productivity from '../assets/images/productivity.jpeg'
const logo = require('../assets/images/pomodoro.cc.png')

export default class Support extends Component {
  render () {
    return <div className='content support'>
      <img className='support-image' src={logo} />
      <h1>Pomodoro.cc needs your support!</h1>

      <h3 className='light1'>Please consider becoming a backer on Patreon!</h3>

      <a href='https://www.patreon.com/bePatron?u=19605363' data-patreon-widget-type='become-patron-button'>Become a Patron!</a><script async src='https://c6.patreon.com/becomePatronButton.bundle.js' />

      <h3 className='light'>Every donation is very much appreciated.</h3>
      <h3 className='light'>With your support <strong>you</strong> can help us sustain the service costs and make it possible to continue to provide a free service.</h3>
      <p>We strongly believe in distractions free work and thus decided <strong>to not show ads</strong>.</p>

      <img src={Productivity} />
    </div>
  }
}
