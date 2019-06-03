import React, {Component} from 'react'
import Link from './utils/Link'
import User from './User'
import './NavigationBar.styl'

export default class NavigationBar extends Component {
  render () {
    const {user} = this.props
    return <nav className='top-bar-container'>
      <div className='navigation-bar'>
        <Link to='/'><span className='brand' /></Link>
        {user && user.subscription && user.subscription.status === 'active' && <Link to='/statistics'>Statistics</Link>}
        {(!user || !user.subscription) && <Link className='pro' to='/pro'>Pro</Link>}
        <Link to='/team' id='team'>Team</Link>
        <Link to='/support'>Support us!</Link>
        <Link to='/open' id='open-stats'>Open</Link>
        <Link to='/about' id='open-stats'>About</Link>
        <div class='float-right'>
          {!user && <Link to='/login'>Login</Link>}
          <User user={user} />
        </div>
      </div>
    </nav>
  }
}
