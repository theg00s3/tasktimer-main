var Loader = require('react-loader')
  , React = require('react')
  , AuthService = require('../modules/AuthService')

var LoginLogout = require('../components/LoginLogout')
  , UserProfile = require('../components/UserProfile')

module.exports = function(context){
  React.render(<Profile/>, document.querySelector('main'))
}


var Profile = React.createClass({
  getInitialState: function(){
    return {
      apikey: undefined,
      authorized: undefined,
    }
  },
  componentWillMount: function(){
    AuthService.authenticate()
    .then(this._handleAuthenticationSuccess)
    .catch(this._handleAuthenticationFailure)
  },
  _handleAuthenticationSuccess: function(response){
    var data = response.data
    var apikey = data.apikey
    this.setState({
      apikey: apikey,
      authorized: true,
      loaded: true
    })
  },
  _handleAuthenticationFailure: function(){
    this.setState({
      authorized: false,
      loaded: true
    })
  },
  render: function(){
    return  <div className="profile-content">
              <header className="prominent-header">
                <div className="limit tac">
                  <h1>Profile</h1>
                </div>
              </header>
              <div className="content limit breath">
                <div className="limit">
                  <Loader loaded={this.state.loaded}>
                    {this._getContent()}
                  </Loader>
                </div>
              </div>
            </div>
  },
  _getContent: function(){
    if( !this.state.authorized ){
      return  <div className="tac">
                <LoginLogout onlyLogin={true} className="big center"/>
                <br/>
                <h6 className="no">to see your profile</h6>
              </div>
    }
    var yourDataLink = 'https://'+window.location.host+'/api/pomodoro?apikey=' + this.state.apikey
    return  <div>
              <div className="ovh">
                <UserProfile className="big left show-username"/>
                <a href={yourDataLink} className="left" target="_blank">Download your data</a>
              </div>
              <hr/>
              <div>
                <h4>For developers</h4>
                <span>Your api key is: </span>
                <strong>{this.state.apikey}</strong>
                <br/>
                <p>
                  Documentation is on the way, stay up to date by following us on &nbsp;
                  <a href="https://twitter.com/pomodoro_cc" target="_blank">Twitter</a>
                </p>
              {/* Check out the <a href="/developers">documentation</a> for more info */}
              </div>
            </div>

  }
})
