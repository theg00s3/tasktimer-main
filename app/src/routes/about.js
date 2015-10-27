var React = require('react')


module.exports = function(context){
  React.render(<About/>, document.querySelector('main'))
}


var About = React.createClass({
  render: function(){
    return  <div className="about-content">
              <header className="prominent-header">
                <div className="limit tac">
                  <h1>Boost your productivity</h1>
                  <h5>Manage your time more effectively</h5>
                </div>
              </header>
              <div className="content limit breath">
                <div className="limit small">
                  <p>
                    Pomodoro.cc is a time tracking tool that will help you to keep track of your work and review your achieved goals for the day.
                    <br/>
                    By following the guidelines of the
                    <a className="simple" href="http://pomodorotechnique.com/" target="_blank">Pomodoro technique &reg;</a>
                    you ll be able to boost your productivity, work in more concentrated bursts and have frequent, mind refreshing breaks.
                  </p>
                  <p>
                    Pomodoro.cc is <a href="https://github.com/christian-fei/pomodoro.cc">hosted on Github</a> as an open-source project to which you can contribute, hack on and give feedback in form of a Github issue.
                  </p>
                </div>
              </div>
            </div>
  }
})
