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
      .then(function(response){
        if( this.isMounted() && response.status === 200 ){
          this.setState(response.data)
        }
      }.bind(this))
      .catch(function(){})
  },
  render: function(){
    if( this.state.avatar )
      return  <img className="user-profile" src={this.state.avatar}/>
    return null
  }
})
