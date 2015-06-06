var React = require('react')
var UserService = require('../modules/UserService')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      'avatar': '',
      'username': ''
    }
  },
  componentDidMount: function(){
    UserService.authenticate()
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
