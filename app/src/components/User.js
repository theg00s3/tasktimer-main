import React, {Component} from 'react'
import Link from './utils/Link'
import './User.styl'

export default class User extends Component {
  render () {
    const {user, active} = this.props
    if (!user) return null
    const href = `/profile`

    return <span className='user' style='vertical-align: sub;'>
      <Link className={active && 'active'} href={href}>
        Profile &nbsp;
        <img src={user.avatar} class='user-avatar' />
        {user.subscription && user.subscription.status === 'active' && <span className='pro-badge small'>Pro</span>}
      </Link>
      &nbsp;
      &nbsp;
      <Link href='/logout'>Logout</Link>
    </span>
  }
}
