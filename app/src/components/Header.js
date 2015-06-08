var React = require('react')
  , Dropdown = require('./Dropdown')
  , UserProfile = require('./UserProfile')
  , LoginLogout = require('./LoginLogout')

module.exports = React.createClass({
  render: function() {
    var items = [
      <li key="1"><a href="/">Dashboard</a></li>,
      <li key="2"><a href="/about">About</a></li>,
      <li key="3" className="divider"></li>
    ]
    return  <header role="header">
              <div className="content">
                <a href="/" className="brand">p<span className="rest">omodoro</span><span className="tld">.cc</span></a>
                <UserProfile/>
                <LoginLogout/>
              </div>
            </header>
  }
})
