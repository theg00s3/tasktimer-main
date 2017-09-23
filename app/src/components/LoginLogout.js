require('./LoginLogout.styl')
import {h, Component} from 'preact'

export default class LoginLogout extends Component {
  render() {
    const {user} = this.props
    const {avatar} = user
    if( avatar ) {
      return  <div className="login-logout">
                <a href="/auth/logout" className="logout">Logout</a>
              </div>
    }
    return  <div className="login-logout">
              <a href="/auth/twitter" target="_self">Twitter</a>
              <a href="/auth/github" target="_self">GitHub</a>
            </div>
  }
}
