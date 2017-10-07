import Profile from './Profile'
import NavigationBar from './NavigationBar'
import LoginLogout from './LoginLogout'
import React, {Component} from 'react'
import {Link} from 'react-router'
require('./TopBar.styl')

export default class TopBar extends Component {
  render () {
    const {user} = this.props
    return <div className='top-bar-container'>
      <div className='top-bar'>
        <NavigationBar />
        <Profile user={user} />
        <div style={{'float': 'right'}}>
          {user.username
                    ? <LoginLogout user={user} style={{'float': 'right'}} />
                    : <Link to='/login'>Login</Link>
                  }
        </div>
      </div>
    </div>
  }
}
