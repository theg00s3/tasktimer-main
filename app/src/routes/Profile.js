require('./Profile.styl')

import {h, Component} from 'preact'
import {connect} from 'preact-redux'

class Profile extends Component {
  render () {
    const {user} = this.props
    return <div className='content profile'>
      <h2>This is you:</h2>
      <img src={user.avatar} style={{width: '100px', height: '100px'}} alt='' />
      <p>{user.username}</p>
      <div>
        <label>Your api key: &nbsp;</label>
        <i>{user.apikey}</i>
      </div>
      <br />
      <div>Pssst! Check out the <a href='/docs'>docs</a> ;)</div>
    </div>
  }
}

export default connect(
  (state) => ({
    user: state.user
  }),
  (dispatch) => ({
  })
)(Profile)
