var React = require('react')


module.exports = function(context){
  React.render(<FourOFour/>, document.querySelector('main'))
}


var FourOFour = React.createClass({
  render: function(){
    return  <div className="about-content">
              <header className="prominent-header"></header>
              <div className="content limit extended small breath">
                <div className="limit tac">
                  <img src="/assets/img/404.png"/>
                  <p>
                    Do not waste time,
                    <a href="/" className="button">start your first pomodoro</a>
                  </p>
                </div>
              </div>
            </div>
  }
})
