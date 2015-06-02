var React = require('react')
var PomodoroTimer = require('../components/PomodoroTimer')
var GridMenu = require('../components/GridMenu')
var store = require('store')
var moment = require('moment')
var axios = require('axios')


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
    if( this.state.pomodoroData && this.state.pomodoroData.minutes && this.state.pomodoroData.startedAt ){
      remaining = parseInt((moment(this.state.pomodoroData.startedAt).unix() + this.state.pomodoroData.minutes*60 - moment().unix()),10)
    }else{
      store.remove('pomodoroData')
    }
    return  <div className="main">
              <PomodoroTimer remaining={remaining} data={this.state.pomodoroData} notify={pomodoroEvent}/>
              <GridMenu className="limit extended"/>
            </div>
  }
})

function pomodoroEvent(eventName, minutes, type, time){
  if( eventName === 'stop' ){
    axios.post('/api/pomodoro', store.get('pomodoroData'))
      .then(function(){})
      .catch(function(){})
    store.remove('pomodoroData')
    return
  }
  if( eventName === 'tick' ) {
    console.log( 'tick', time )
    document.title = time
    return
  }
  store.set('pomodoroData', {
    minutes: minutes,
    type: type,
    startedAt: Date.now()
  })
}
