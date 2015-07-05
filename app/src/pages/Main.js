var React = require('react')
  , PomodoroTimer = require('../components/PomodoroTimer')
  , LoginLogout = require('../components/LoginLogout')
  , PomodoroEventHandler = require('../modules/PomodoroEventHandler')
  , Timer = require('../modules/Timer')
  , store = require('store')

module.exports = function(context){
  React.render(<Main></Main>, document.querySelector('main'))
}


var Main = React.createClass({
  render: function() {
    var remaining = Timer.getRemaining()
    var pomodoroData = store.get('pomodoroData')
    if( remaining <= 0 && pomodoroData ){
      PomodoroEventHandler('end', pomodoroData.minutes, pomodoroData.type)
    }
    return  <div>
              <PomodoroTimer data={pomodoroData} notify={PomodoroEventHandler}/>
              <div className="content breath">
                <LoginLogout onlyLogin={true} text="Keep track of your work, login with" className="big center"/>
              </div>
            </div>
  }
})
