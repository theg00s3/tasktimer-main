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
                  <li>
                    <a href="/about" id="about-link" className="activate-on" data-active="/about" tabIndex="3">About</a>
                  </li>
                  <li>
                    <a href="/blog" id="blog-link" className="activate-on" data-active="/blog" tabIndex="4">Blog</a>
                  </li>
                </ul>
                <LoginLogout tabIndex="5"/>
                <UserProfile tabIndex="4"/>
              </div>
            </header>
  }
})
