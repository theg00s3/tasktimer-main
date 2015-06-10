var React = require('react')
  , Dropdown = require('./Dropdown')
  , UserProfile = require('./UserProfile')
  , LoginLogout = require('./LoginLogout')

module.exports = React.createClass({
  render: function() {
    var items = [
      <li key="1"><a href="/">Dashboard</a></li>,
      <li key="3"><a href="/statistics">Statistics</a></li>,
      <li key="2"><a href="/about">About</a></li>,
    ]
    return  <header role="header">
              <div className="content">
                <a href="/" tabIndex="1" className="brand">p<span className="rest">omodoro</span><span className="tld">.cc</span></a>
                <Dropdown text="Menu" items={items} tabIndex="2"/>
                <UserProfile/>
                <LoginLogout/>
              </div>
            </header>
  }
})
