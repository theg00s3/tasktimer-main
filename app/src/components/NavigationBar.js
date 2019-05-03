import React, {Component} from 'react'
import Link from './utils/Link'
import User from './User'
import './NavigationBar.styl'

export default class NavigationBar extends Component {
  render () {
    const {user} = this.props
    return <div className='navigation-bar'>
      <Link to='/'><span className='brand' /></Link>
      {!user && <Link to='/login'>Login</Link>}
      <Link to='/export'>Export</Link>
      <Link to='/support'>Support us!</Link>
      <Link to='/open' id='open-stats'>Open</Link>
      {/* <a href='https://medium.com/@pomodoro_cc' target='_blank'>Blog</a> */}
      <User user={user} />
    </div>
  }
}
