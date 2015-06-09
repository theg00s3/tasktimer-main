var React = require('react')

var mainHeader = document.getElementById('main-header')

module.exports = function(context){
  React.render(<About/>, document.querySelector('main'))
}


var About = React.createClass({
  componentWillUnmount: function(){
    mainHeader.classList.remove('white')
  },
  componentDidMount: function(){
    mainHeader.classList.add('white')
  },
  render: function(){
    return  <div>
              <header className="prominent-header">
                <div className="content">
                  <h1>Boost your productivity</h1>
                  <h5>Manage your time more effectively</h5>
                </div>
              </header>
              <div className="content breath">
                <p className="breath">
                  Pomodoro.cc tool will keep help you to keep track of your work and review your achieved goals for the day.
                  <br/>
                  By following the guidelines of the
                  <a className="simple" href="http://pomodorotechnique.com/" target="_blank">Pomodoro technique &reg;</a>
                  you ll be able to boost your productivity, work in more concentrated bursts and have frequent, mind refreshing breaks.
                </p>
                <a className="button bordered inverted rounded block tac first-pomodoro-cta" href="/">start your first pomodoro!</a>
              </div>
            </div>
  }
})
