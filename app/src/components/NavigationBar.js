import React, {Component} from 'react'
import Link from './utils/Link'
import './NavigationBar.styl'

export default class NavigationBar extends Component {
  render () {
    return <div className='navigation-bar'>
      <Link to='/'><span className='brand' /></Link>
      <Link to='/statistics'>Statistics</Link>
      <Link to='/support'>Support us!</Link>
      <a href='https://medium.com/@pomodoro_cc' target='_blank'>Blog</a>
    </div>
  }
}
