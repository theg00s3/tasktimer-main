var React = require('react')
  , PomodoroTimer = require('../components/PomodoroTimer')
  , LoginLogout = require('../components/LoginLogout')
  , SoundSettings = require('../components/SoundSettings')
  , PomodoroEventHandler = require('../modules/PomodoroEventHandler')
  , SettingsEventHandler = require('../modules/SettingsEventHandler')
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
              <header className="prominent-header">
              </header>
              <div className="content limit extended small breath">
                <div className="limit">
                  <PomodoroTimer data={pomodoroData} notify={PomodoroEventHandler}/>
                  <SoundSettings/>
                  <div className="limit breath">
                    <LoginLogout onlyLogin={true} text="Keep track of your work, login with" className="big center"/>
                  </div>
                </div>
              </div>
            </div>
  }
})
