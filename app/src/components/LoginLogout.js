var React = require('react')
var axios = require('axios')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: false
    }
  },
  componentWillMount: function(){
    var loggedIn = false
    axios.get('/auth/info')
      .then(function(response){
        loggedIn = true
      }.bind(this))
      .catch(function(){})
      .finally(function(){
        this.setState({
          loggedIn: loggedIn
        })
      })
  },
  render: function(){

  }
})
