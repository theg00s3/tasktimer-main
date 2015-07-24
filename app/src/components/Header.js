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
                    <a href="/statistics" tabIndex="2">Stats</a>
                  </li>
                  <li>
                    <a href="/blog" tabIndex="3">Blog</a>
                  </li>
                  <li>
                    <a href="/about" tabIndex="4">About</a>
                  </li>
                </ul>
                <LoginLogout/>
                <UserProfile/>
              </div>
            </header>
  }
})
