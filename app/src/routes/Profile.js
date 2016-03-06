require('./Profile.styl')

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Profile extends Component {
  render() {
    const {user} = this.props
    console.log( '-- user', user )
    return  <div className="content profile">
              <h2>This is you:</h2>
              <img src={user.avatar} style={{width: "100px", height: "100px"}} alt=""/>
              <p>{user.username}</p>
              <div>
                <label>Your api key: &nbsp;</label>
                <i>{user.apikey}</i>
              </div>
            </div>
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
  })
)(Profile)
