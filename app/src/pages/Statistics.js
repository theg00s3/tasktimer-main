var React = require('react')

module.exports = function(context){
  React.render(<Statistics></Statistics>, document.querySelector('main'))
}


var Statistics = React.createClass({
  render: function(){
    return  <div className="content">
              <h1 className="tac">Statistics</h1>
            </div>
  }
})
