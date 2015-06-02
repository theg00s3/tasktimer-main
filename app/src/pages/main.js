var React = require('react')
var PomodoroTimer = require('../components/PomodoroTimer')
var store = require('store')
var moment = require('moment')


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
            </div>
  }
})

function pomodoroEvent(eventName, minutes, type){
  if( eventName === 'stop' ){
    store.remove('pomodoroData')
    return
  }
  store.set('pomodoroData', {
    minutes: minutes,
    type: type,
    startedAt: Date.now()
  })
}
