var React = require('react')
  , PomodoroTimer = require('../components/PomodoroTimer')
  , LoginLogout = require('../components/LoginLogout')
  , PomodoroEventHandler = require('../modules/PomodoroEventHandler')
  , store = require('store')
  , moment = require('moment')
  , constants = require('../../../shared/constants')

module.exports = function(context){
  React.render(<Main></Main>, document.querySelector('main'))
}


var Main = React.createClass({
  getInitialState: function(){
    return {
      pomodoroData: null
    }
  },
  componentWillMount: function(){
    this.setState({
      pomodoroData: store.get('pomodoroData')
    })
  },
  render: function() {
    var remaining = 0
    if( this.state.pomodoroData ){
      if( this.state.pomodoroData.minutes && this.state.pomodoroData.startedAt ){
        remaining = parseInt((moment(this.state.pomodoroData.startedAt).unix() + this.state.pomodoroData.minutes*60 - moment().unix()),10)
      }
    }
    if( remaining < 0 ){
      PomodoroEventHandler('end', this.state.pomodoroData.minutes, this.state.pomodoroData.type)
    }
    return  <div>
              <PomodoroTimer remaining={remaining} data={this.state.pomodoroData} notify={PomodoroEventHandler}/>
              <div className="content breath">
                <LoginLogout onlyLogin={true} text="Keep track of your work, login with" className="big center"/>
              </div>
            </div>
  }
})
