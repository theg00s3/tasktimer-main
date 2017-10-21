import NavigationBar from './NavigationBar'
import React, {Component} from 'react'
import './TopBar.styl'

export default class TopBar extends Component {
  render () {
    const {user} = this.props
    return <div className='top-bar-container'>
      <div className='top-bar'>
        <NavigationBar user={user} />
      </div>
    </div>
  }
}
