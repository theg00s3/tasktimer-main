import React, {Component} from 'react'
import Link from './utils/Link'
import './User.styl'

export default class User extends Component {
  render () {
    const {user} = this.props
    if (!user) return null
    return <span className='user'>
      <img src={user.avatar} class='user-avatar' />
      <Link href='/logout'>Logout</Link>
    </span>
  }
}
