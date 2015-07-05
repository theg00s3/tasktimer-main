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
      .then(function(response){
        this.setState({
          loggedIn: true
        })
      }.bind(this))
      .catch(function(){
        this.setState({
          loggedIn: false
        })
      }.bind(this))
  },
  render: function(){
    if( this.state.loggedIn === undefined ) {
      return null
    }
    if( !this.state.loggedIn ) {
      return  <div className={this.props.className + " login-logout"}>
                <span className="text">{this.props.text || "Login with"}</span>
                <div className="login-buttons">
                  <a href="/auth/twitter" target="_self" className="login-button twitter">
                    <i className="icon ion-social-twitter"></i>
                  </a>
                  <a href="/auth/github" target="_self" className="login-button github">
                    <i className="icon ion-social-github"></i>
                  </a>
                </div>
              </div>
    }
    if( !!this.props.onlyLogin ) {
      return null
    }
    return  <div className="login-logout">
              <a href="/auth/logout" className="logout">Logout</a>
            </div>
  }
})
