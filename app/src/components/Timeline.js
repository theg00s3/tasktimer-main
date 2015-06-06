var React = require('react')

module.exports = React.createClass({
  render: function(){
    var timeline = this.props.data.map(function(dataPoint){
      return  <li className={"type-"+dataPoint.type}>
                {dataPoint.minutes} - {dataPoint.startedAt}
              </li>
    })

    return <ul className="timeline">
              {timeline}
            </ul>
  }
})
