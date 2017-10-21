import React, {Component} from 'react'
import './User.styl'

export default class User extends Component {
  render () {
    const {user} = this.props
    return <div className='user'>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  }
}
