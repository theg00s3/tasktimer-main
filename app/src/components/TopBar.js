import NavigationBar from './NavigationBar'
import React, {Component} from 'react'
import './TopBar.styl'

export default class TopBar extends Component {
  render () {
    return <div className='top-bar-container'>
      <div className='top-bar'>
        <NavigationBar />
      </div>
    </div>
  }
}
