require('./Profile.styl')

import React, {Component, PropTypes} from 'react'

export default class Profile extends Component {
  render() {
    const {user} = this.props
    const {avatar} = user
    if( !avatar ) {
      return  null
    }
    return  <div className="profile">
              <img className="item" src={avatar}/>
            </div>
  }
}
Profile.propTypes = {
  user: PropTypes.object.isRequired
}
