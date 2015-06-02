var React = require('react')
var axios = require('axios')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: false
    }
  },
  componentWillMount: function(){
    axios.get('/auth/info')
      .then(function(response){
        this.setState({
          loggedIn: true
        })
      }.bind(this))
      .catch(function(){
        this.setState({
          loggedIn: false
        })
      })
  },
  render: function(){
    if( !this.state.loggedIn ) {
      return  <li>
                <a href="/auth/twitter" target="_self" className="login-button first">
                  <i className="icon ion-social-twitter"></i>
                </a>
                <a href="/auth/github" target="_self" className="login-button">
                  <i className="icon ion-social-github"></i>
                </a>
              </li>
    }
    return  <li>
              <a href="/auth/logout">Logout</a>
            </li>
  }
})
