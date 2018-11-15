import NavigationBar from './NavigationBar'
import React, {Component} from 'react'
import './TopBar.styl'

export default class TopBar extends Component {
  render () {
    const {user} = this.props
    return <nav className='top-bar-container'>
      <div className='top-bar'>
        <NavigationBar user={user} />
      </div>
    </nav>
  }
}
