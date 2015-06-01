var React = require('react')

module.exports = React.createClass({
  render: function(){
    var listItems = this.props.items.map(function(item){
      if( /divider/.test(item.type) ){
        return (
          <li className="divider">{item.text}</li>
        )
      }
      return (
        <li>
          <a href={item.url}>{item.text}</a>
        </li>
      )
    })

    return  <div className="dropdown">
              <ul className="menu">
                {listItems}
              </ul>
            </div>
  }
})
