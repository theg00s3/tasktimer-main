import React, { Component } from 'react'
import Link from './utils/Link'
import User from './User'
import './NavigationBar.styl'
import * as actions from '../actions'


export default class NavigationBar extends Component {
  render () {
    const { user, loading, currentUrl, darkMode } = this.props
    return <nav className='top-bar-container'>
      <div className='navigation-bar'>
        <Link to='/'><span className='brand' /></Link>
        <Link className={currentUrl === '/analytics' && 'active'} to='/analytics'>Analytics</Link>
        <Link className={currentUrl === '/statistics' && 'active'} to='/statistics'>Statistics</Link>
        <Link className={currentUrl === '/about' && 'active'} to='/about' id='about'>About</Link>
        {loading.loadingUser && <div className='float-right'>
          <div className='spinner' />
        </div>}
        {!loading.loadingUser && <div className='float-right login-container'>
          {!user && <Link className={currentUrl === '/login' && 'active'} to='/login'>Login</Link>}
          <User user={user} loading={loading} active={currentUrl === '/profile'} />
        </div>}
      </div>
    </nav>
  }
}

