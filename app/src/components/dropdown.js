var React = require('react')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      opened: false
    }
  },
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
              <span className="menu-text">{this.props.text}</span>
              <ul className="menu">
                {listItems}
              </ul>
            </div>
  }
})
