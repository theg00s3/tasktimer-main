var React = require('react')

module.exports = React.createClass({
  render: function(){
    return <svg {...this.props}>{this.props.children}</svg>;
  }
})


/*

https://biesnecker.com/2014/10/22/using-reactjs-to-draw-dynamic-svgs/

*/
