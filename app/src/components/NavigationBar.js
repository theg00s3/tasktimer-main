import React, {Component} from 'react'
import Link from './utils/Link'
require('./NavigationBar.styl')

export default class NavigationBar extends Component {
  render () {
    return <div className='navigation-bar'>
      <Link to='/'><span className='brand' /></Link>
      <a href='https://medium.com/@pomodoro_cc' target='_blank'>Blog</a>
      <Link to='/support'>Support us!</Link>
      <Link to='/statistics'>Statistics</Link>
    </div>
  }
}
