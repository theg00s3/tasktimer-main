import React, {Component} from 'react'
import Link from './utils/Link'
import './User.styl'

export default class User extends Component {
  render () {
    const {user} = this.props
    if (!user) return null
    const href = `/user/${user.username}`

    return <span className='user'>
      <Link href={href}>
        <img src={user.avatar} class='user-avatar' />
      </Link>
      <Link href='/logout'>Logout</Link>
    </span>
  }
}
