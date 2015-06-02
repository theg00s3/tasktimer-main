var React = require('react')
var Dropdown = require('./dropdown')
var UserProfile = require('./UserProfile')
var LoginLogout = require('./LoginLogout')

module.exports = React.createClass({
  render: function() {
    var items = [
      <li><a href="/">Dashboard</a></li>,
      <li><a href="/about">About</a></li>,
      <li className="divider"></li>,
      <LoginLogout/>
    ]
    return  <header role="header">
              <div className="content">
                <a href="/" className="brand">P<span className="rest">omodoro</span><span className="tld">.cc</span></a>
                <Dropdown text="Menu" items={items}/>
                <UserProfile/>
              </div>
            </header>
  }
})
