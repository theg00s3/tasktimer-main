var Loader = require('react-loader')
var React = require('react')
var axios = require('axios')

var PieChart = require("react-chartjs").Pie


module.exports = function(context){
  var day = '02/06/2015'
  var dataPromise = axios.get('/api/pomodoro',{
    params: {
      day: day
    }
  })
  React.render(<Statistics dataPromise={dataPromise}></Statistics>, document.querySelector('main'))
}

var chartData = [{
  value: 300,
  color:"#DF2E2E",
  highlight: "#DF2E2E",
  label: "Pomodori"
},
{
  value: 50,
  color: "#24b524",
  highlight: "#24b524",
  label: "Breaks"
}]

var chartOptions = {
  //Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout : 35, // This is 0 for Pie charts

  //Number - Amount of animation steps
  animationSteps : 100,

  //String - Animation easing effect
  animationEasing : "easeOutBounce",

  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate : true,

  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale : false,

}

var Statistics = React.createClass({
  getInitialState: function(){
    return {
      data: null,
      loaded: false
    }
  },
  componentDidMount: function(){
    this.props.dataPromise
      .then(function(response){
        setTimeout(function(){
          this.setState({
            data: response.data,
            loaded: true
          })
        }.bind(this), 500)
      }.bind(this))
  },
  render: function(){
    var data = this.state.data || []

    var debugData = data.map(function(dat){
      return  <li>
                {dat.minutes} - {dat.type} - {dat.startedAt}
              </li>
    })

    return  <Loader loaded={this.state.loaded}>
              <div className="content">
                <h1 className="tac">Statistics</h1>
                <ul>
                  {debugData}
                </ul>
                <PieChart data={chartData} options={chartOptions}/>
              </div>
            </Loader>
  }
})
