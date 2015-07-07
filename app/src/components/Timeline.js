var React = require('react')

module.exports = React.createClass({
  propTypes: {
    height: React.PropTypes.string.required,
    width: React.PropTypes.string.required,
    data: React.PropTypes.array.required
  },
  render: function(){
    console.log( 'data', this.props.data )
    window.data = this.props.data
    return  <svg height={this.props.height} width={this.props.width} version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet" >
              <g>
                <rect x="0" y="50%" width="100%" height="1" fill="#d1d1d1" />
              </g>
              <circle cx="50%" cy="10" r="10"></circle>
            </svg>
  }
})
