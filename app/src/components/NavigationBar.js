require('./NavigationBar.styl')
import React, {Component} from 'react'
import {Link} from 'react-router'

export default class NavigationBar extends Component {
  render() {
    return  <div className="navigation-bar">
              <Link to="/">
                <span className="brand"></span>
              </Link>
              <a href="https://medium.com/@pomodoro_cc" target="_blank">
                Blog
              </a>
              <Link to="/support">
                Support us!
              </Link>
            </div>
  }
}
