var React = require('react')
var Dropdown = require('./dropdown')

module.exports = React.createClass({
  render: function() {
    var items = [{
      text: 'Dashboard',
      url:  '/'
    },{
      text: 'About',
      url:  '/about'
    }]
    return  <header role="header">
              <div className="content">
                <a href="/" className="brand">P<span className="rest">omodoro</span><span className="tld">.cc</span></a>
                <Dropdown text="Menu" items={items}></Dropdown>
              </div>
            </header>
  }
})
