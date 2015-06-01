var React = require('react')

module.exports = React.createClass({
  render: function() {
    return  <header role="header">
              <div className="content">
                <a href="/" className="brand">P<span className="rest">omodoro</span><span className="tld">.cc</span></a>
              </div>
            </header>
  }
})
