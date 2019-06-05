import React, {Component} from 'react'
import Link from './utils/Link'
import User from './User'
import './NavigationBar.styl'

export default class NavigationBar extends Component {
  render () {
    const {user, loading} = this.props
    return <nav className='top-bar-container'>
      <div className='navigation-bar'>
        <Link to='/'><span className='brand' /></Link>
        <Link to='/statistics'>Statistics</Link>
        {(!user || !user.subscription) && <Link className='pro' to='/pro'>Pro</Link>}
        <Link to='/team' id='team'>Team</Link>
        <Link to='/support'>Support us!</Link>
        <Link to='/open' id='open-stats'>Open</Link>
        <Link to='/about' id='open-stats'>About</Link>
        {loading.loadingUser && <div class='float-right'>
          <div class='spinner' />
        </div>}
        {!loading.loadingUser && <div class='float-right login-container'>
          {!user && <Link to='/login'>Login</Link>}
          <User user={user} loading={loading} />
        </div>}
      </div>
    </nav>
  }
}
