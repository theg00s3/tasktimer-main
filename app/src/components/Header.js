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
    },{
      type: 'divider'
    },{
      type: 'raw',
      text: '\
        <a href="/auth/twitter" target="_self" style="width: 3em; margin-left: 1em; float:left; display:inline-block; text-indent: 0">\
          <i style="float:left" class="icon ion-social-twitter"></i>\
        </a>\
        <a href="/auth/github" target="_self" style="width: 3em; float:left; display:inline-block; text-indent: 0">\
          <i style="float:left" class="icon ion-social-github"></i>\
        </a>\
      '
    }]
    return  <header role="header">
              <div className="content">
                <a href="/" className="brand">P<span className="rest">omodoro</span><span className="tld">.cc</span></a>
                <Dropdown text="Menu" items={items}></Dropdown>
              </div>
            </header>
  }
})
