var Loader = require('react-loader')
var React = require('react')
var Timeline = require('../components/Timeline')
var StatisticsDetailsList = require('../components/StatisticsDetailsList')
var axios = require('axios')
var PomodoroUtils = require('../../../shared/PomodoroUtils')
var  _ = require('underscore')
var moment = require('moment')
var PieChart = require("react-chartjs").Pie


var mainHeader = document.getElementById('main-header')


module.exports = function(context){
  var day = moment().format('DD/MM/YYYY')
  var dataPromise = axios.get('/api/pomodoro',{
    params: {
      day: day
    }
  })
  React.render(<Statistics day={day} dataPromise={dataPromise}></Statistics>, document.querySelector('main'))
}

var chartOptions = {
  percentageInnerCutout : 35,
  animationSteps : 75,
  animationEasing : "easeOutBounce",
  animateRotate : true,
  animateScale : false,
  tooltipTemplate: "<%=label%>: <%= value %>min",
}
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

var Statistics = React.createClass({
  getInitialState: function(){
    return {
      data: [],
      loaded: false,
      chartData: [],
      authorized: true
    }
  },
  componentWillUnmount: function(){
    mainHeader.classList.remove('white')
  },
  componentDidMount: function(){
    mainHeader.classList.add('white')
    this.props.dataPromise
      .then(function(response){
        var data = response.data
        _.reduce(data, function(memo, pomodoro){
          var indexType = pomodoro.type === 'pomodoro' ? 0 : 1
          memo[indexType].value += PomodoroUtils.getDurationInMinutes(pomodoro)
          return memo
        }, chartData)
        setTimeout(function(){
          this.setState({
            data: data,
            loaded: true,
            chartData: chartData
          })
        }.bind(this), 300)
      }.bind(this))
      .catch(function(response){
        this.setState({
          loaded:true,
          authorized: false
        })
      }.bind(this))
  },
  render: function(){
    var authorizedContent = <div>
                              <div className="row">
                                <PieChart className="col" data={this.state.chartData} options={chartOptions}/>
                                <StatisticsDetailsList className="col" data={this.state.chartData}/>
                              </div>
                              <Timeline className="col" data={this.state.data}/>
                            </div>
    var unauthorizedContent = [<h1>Unauthorized</h1>]
    var content = !this.state.authorized ? unauthorizedContent : authorizedContent
    return  <div className="statistics-content">
                <header className="statistics-header">
                  <div className="content">
                    <h1 className="statistics-heading">Statistics</h1>
                    <h5 className="statistics-day">{this.props.day}</h5>
                  </div>
                </header>
                <div className="content breath">
                  <Loader loaded={this.state.loaded}>
                    {content}
                  </Loader>
                </div>
              </div>
  }
})
