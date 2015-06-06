var React = require('react')

module.exports = React.createClass({
  render: function(){
    var data = this.props.data || []
    if( data.length === 0 )
      return null

    return  <div className="statistics-details-list" {...this.props}>
            </div>
  }
})
