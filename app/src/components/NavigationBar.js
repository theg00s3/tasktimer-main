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
      <a href='https://medium.com/@pomodoro_cc' target='_blank'>Blog</a>
      <User user={user} />
      <div className='early-access'>
        Get early access to <a href='https://frittata.cc' target='_blank' className='underline'>frittata.cc</a>
      </div>
    </div>
  }
}
