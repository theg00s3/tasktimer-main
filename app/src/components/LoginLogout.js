var React = require('react')
  , AuthService = require('../modules/AuthService')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: undefined
    }
  },
  componentWillMount: function(){
    AuthService.authenticate()
    .then(this._handleAuthenticationSuccess)
    .catch(this._handleAuthenticationFailure)
  },
  _handleAuthenticationSuccess: function(response){
    this.setState({
      loggedIn: true
    })
  },
  _handleAuthenticationFailure: function(){
    this.setState({
      loggedIn: false
    })
  },
  render: function(){
    if( this.state.loggedIn === undefined ) {
      return null
    }
    if( !this.state.loggedIn ) {
      return  <div className={this.props.className + " login-logout"}>
                <span className="text">{this.props.text || "Signup or login with"}</span>
                <div className="login-buttons">
                  <a href="/auth/twitter" target="_self" className="twitter">
                    <i className="icon ion-social-twitter"></i>
                  </a>
                  <a href="/auth/github" target="_self" className="github">
                    <i className="icon ion-social-github"></i>
                  </a>
                </div>
              </div>
    }
    if( !!this.props.onlyLogin ) {
      return null
    }
    return  <div className="login-logout">
              <a href="/auth/logout" className="logout" id="logout-link">Logout</a>
            </div>
  }
})
