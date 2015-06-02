var React = require('react')
var Dropdown = require('./dropdown')
var UserProfile = require('./UserProfile')

module.exports = React.createClass({
  render: function() {
    var items = [
      <li><a href="/">Dashboard</a></li>,
      <li><a href="/about">About</a></li>,
      <li className="divider">Something</li>,
      <li>
        <a href="/auth/twitter" target="_self" className="login-button first">
          <i className="icon ion-social-twitter"></i>
        </a>
        <a href="/auth/github" target="_self" className="login-button">
          <i className="icon ion-social-github"></i>
        </a>
      </li>,
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
