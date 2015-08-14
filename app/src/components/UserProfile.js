var React = require('react')
  , AuthService = require('../modules/AuthService')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      'avatar': '',
      'username': ''
    }
  },
  componentDidMount: function(){
    AuthService.authenticate()
    .then(this._handleAuthenticationSuccess)
    .catch(this._handleAuthenticationFailure)
  },
  _handleAuthenticationSuccess: function(response){
    if( this.isMounted() && response.status === 200 ){
      var user = response.data
      var username = user.username
      var avatar = user.avatar
      this.setState({
        username: username,
        avatar: avatar,
      })
    }
  },
  _handleAuthenticationFailure: function(){},
  render: function(){
    if( this.state.avatar )
      var className = 'user-profile ' + this.props.className
      return  <a href="/profile" id="profile-link" activate-on="/profile" className={className}>
                <img src={this.state.avatar}/>
                <p className="username">{this.state.username}</p>
              </a>
    return null
  }
})
