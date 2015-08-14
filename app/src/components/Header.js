var React = require('react')
  , UserProfile = require('./UserProfile')
  , LoginLogout = require('./LoginLogout')

module.exports = React.createClass({
  render: function() {
    return  <header role="header">
              <div className="limit">
                <a href="/" tabIndex="1" className="brand">p<span className="rest">omodoro</span><span className="tld">.cc</span></a>
                <ul className="menu">
                  <li>
                    <a href="/statistics" id="statistics-link" className="activate-on" data-active="/statistics" tabIndex="2">Stats</a>
                  </li>
                </ul>
                <LoginLogout tabIndex="4"/>
                <UserProfile tabIndex="3"/>
              </div>
            </header>
  }
})
