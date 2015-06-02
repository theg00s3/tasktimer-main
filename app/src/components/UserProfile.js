var React = require('react')
var axios = require('axios')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      'avatar': '',
      'username': ''
    }
  },
  componentDidMount: function(){
    axios.get('/auth/info')
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
