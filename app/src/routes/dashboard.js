var React = require('react')
  , PomodoroTimer = require('../components/PomodoroTimer')
  , LoginLogout = require('../components/LoginLogout')
  , TwitterShare = require('../components/TwitterShare')
  , SoundSettings = require('../components/SoundSettings')
  , PomodoroEventHandler = require('../modules/PomodoroEventHandler')
  , SettingsEventHandler = require('../modules/SettingsEventHandler')
  , Timer = require('../modules/Timer')
  , store = require('store')

module.exports = function(context){
  React.render(<Dashboard/>, document.querySelector('main'))
}


var Dashboard = React.createClass({
  render: function() {
    var remaining = Timer.getRemaining()
    var pomodoroData = store.get('pomodoroData')
    if( remaining <= 0 && pomodoroData ){
      PomodoroEventHandler('end', pomodoroData.minutes, pomodoroData.type)
    }
    return  <div>
              <header className="prominent-header">
              </header>
              <div className="content limit breath">
                <div className="limit">
                  <TwitterShare/>
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
