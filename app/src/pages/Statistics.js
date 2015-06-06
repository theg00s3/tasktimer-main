var Loader = require('react-loader')
var React = require('react')
var Timeline = require('../components/Timeline')
var axios = require('axios')
var PomodoroUtils = require('../../../shared/PomodoroUtils')
var  _ = require('underscore')
var moment = require('moment')
var PieChart = require("react-chartjs").Pie


module.exports = function(context){
  var day = moment().format('DD/MM/YYYY')
  var dataPromise = axios.get('/api/pomodoro',{
    params: {
      day: day
    }
  })
  React.render(<Statistics dataPromise={dataPromise}></Statistics>, document.querySelector('main'))
}

var chartOptions = {
  percentageInnerCutout : 35,
  animationSteps : 75,
  animationEasing : "easeOutBounce",
  animateRotate : true,
  animateScale : false,
}

var Statistics = React.createClass({
  getInitialState: function(){
    return {
      data: [],
      loaded: false,
      chartData: []
    }
  },
  componentDidMount: function(){
    var chartData = [{
      value: 0,
      color:"#DF2E2E",
      highlight: "#DF2E2E",
      label: "Pomodori"
    },
    {
      value: 0,
      color: "#24b524",
      highlight: "#24b524",
      label: "Breaks"
    }]
    this.props.dataPromise
      .then(function(response){
        var data = response.data
        _.reduce(data, function(memo, pomodoro){
          var indexType = pomodoro.type === 'pomodoro' ? 0 : 1
          memo[indexType].value += PomodoroUtils.getDuration(pomodoro)/60
          return memo
        }, chartData)
        setTimeout(function(){
          this.setState({
            data: data,
            loaded: true,
            chartData: chartData
          })
        }.bind(this), 500)
      }.bind(this))
  },
  render: function(){
    var data = this.state.data || []

    var timeline = data.map(function(dataPoint){
      return  <li className={"type-"+dataPoint.type}>
                {dataPoint.minutes} - {dataPoint.startedAt}
              </li>
    })

    return  <Loader loaded={this.state.loaded}>
              <div className="content">
                <h1 className="tac">Statistics</h1>
                <Timeline data={this.state.data}/>
                <PieChart data={this.state.chartData} options={chartOptions}/>
              </div>
            </Loader>
  }
})
