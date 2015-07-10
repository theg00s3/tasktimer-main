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
      this.setState(response.data)
    }
  },
  _handleAuthenticationFailure: function(){},
  render: function(){
    if( this.state.avatar )
      return  <img className="user-profile" src={this.state.avatar}/>
    return null
  }
})
