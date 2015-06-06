var React = require('react')
var UserService = require('../modules/UserService')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: false
    }
  },
  componentWillMount: function(){
    UserService.authenticate()
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
    if( !this.state.loggedIn ) {
      return  <div className="login-logout">
                <span className="text">Login with</span>
                <a href="/auth/github" target="_self" className="login-button github">
                  <i className="icon ion-social-github"></i>
                </a>
                <a href="/auth/twitter" target="_self" className="login-button twitter first">
                  <i className="icon ion-social-twitter"></i>
                </a>
              </div>
    }
    return  <div className="login-logout">
              <a href="/auth/logout" className="logout">Logout</a>
            </div>
  }
})
