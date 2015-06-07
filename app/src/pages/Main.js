var React = require('react')
var PomodoroTimer = require('../components/PomodoroTimer')
var GridMenu = require('../components/GridMenu')
var PomodoroService = require('../modules/PomodoroService')
var PomodoroEventHandler = require('../modules/PomodoroEventHandler')
var store = require('store')
var moment = require('moment')
var constants = require('../../../shared/constants')

module.exports = function(context){
  React.render(<Main></Main>, document.querySelector('main'))
}


var Main = React.createClass({
  getInitialState: function(){
    return {
      pomodoroData: null
    }
  },
  componentWillUnmount: function(){
    resetTitle()
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
    return  <div className="main">
              <PomodoroTimer remaining={remaining} data={this.state.pomodoroData} notify={PomodoroEventHandler}/>
              <GridMenu className="limit extended1"/>
            </div>
  }
})

function resetTitle(){
  document.title = constants.title
}
