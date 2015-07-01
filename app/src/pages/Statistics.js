var Loader = require('react-loader')
  , React = require('react')
  , axios = require('axios')
  ,  _ = require('underscore')
  , moment = require('moment')
  , url = require('url')
  , PieChart = require('react-chartjs').Pie
  , page = require('page')

var Timeline = require('../components/Timeline')
  , LoginLogout = require('../components/LoginLogout')
  , StatisticsDetailsList = require('../components/StatisticsDetailsList')
  , ArrowNavigation = require('../components/ArrowNavigation')

var PomodoroUtils = require('../../../shared/PomodoroUtils')
  , constants = require('../../../shared/constants')

var ChartUtils = require('../modules/ChartUtils')

var mainHeader = document.getElementById('main-header')


module.exports = function(context){
  var day = extractDay(context.path)
  var dataPromise = axios.get('/api/pomodoro',{
    params: {
      day: day
    }
  })
  React.render(<Statistics day={day} dataPromise={dataPromise}></Statistics>, document.querySelector('main'))
}

var chartOptions = {
  percentageInnerCutout : 35,
  animationSteps : 50,
  animationEasing : "easeOutBounce",
  animateRotate : true,
  animateScale : false,
  tooltipTemplate: "<%=label%>: <%= value %>min",
}

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
    document.body.removeEventListener('keydown', this._handleKeyboardNavigation)
    mainHeader.classList.remove('white')
  },
  componentDidMount: function(){
    document.body.addEventListener('keydown', this._handleKeyboardNavigation.bind(this))
    mainHeader.classList.add('white')
    this.props.dataPromise
      .then(function(response){
        var data = response.data
        this.setState({
          data: data,
          loaded: true,
          chartData: ChartUtils.getPieChartDataFrom(data),
        })
      }.bind(this))
      .catch(function(response){
        this.setState({
          loaded:true,
          authorized: false
        })
      }.bind(this))
  },
  render: function(){
    return  <div className="statistics-content">
                <header className="prominent-header">
                  <div className="content">
                    <h1 className="statistics-heading">Statistics</h1>
                    <h5 className="statistics-day">{this.props.day}</h5>
                    <ArrowNavigation onBack={this._navigateBack} onForward={this._navigateForward}/>
                    <Timeline className="col" data={this.state.data}/>
                    <div className="statistics-graph-image"></div>
                  </div>
                </header>
                <div className="content breath">
                  <Loader loaded={this.state.loaded}>
                    {this._getContent()}
                  </Loader>
                </div>
              </div>
  },
  _navigateBack: function(){
    this._navigate('back')
  },
  _navigateForward: function(){
    this._navigate('forward')
  },
  _navigate: function(direction){
    var domNode = this.getDOMNode()
    if( !domNode ) return
    React.unmountComponentAtNode(domNode.parentNode)
    var day = extractDay(window.location.href)
    var newDay = moment(day, constants.dayFormat).subtract(1, 'days').format(constants.dayFormat)
    if( direction === 'forward' ){
      newDay = moment(day, constants.dayFormat).add(1, 'days').format(constants.dayFormat)
    }
    page.show('/statistics?day='+newDay)
  },
  _handleKeyboardNavigation: function(event){
    switch( event.keyCode ){
      case 37:
        this._navigateBack()
        break
      case 39:
        this._navigateForward()
        break
    }
  },
  _getContent: function(){
    var availableContent = <h1 className="tac no">No data!</h1>
    if( this.state.data.length > 0 ){
      availableContent =  <div>
                            <div className="col border-right">
                              <PieChart style={{display:'block', margin:'auto'}} data={this.state.chartData} options={chartOptions}/>
                              <br/>
                              <StatisticsDetailsList data={this.state.data}/>
                            </div>
                          </div>
    }
    var unauthorizedContent = <LoginLogout onlyLogin={true} className="big left"/>

    var authorizedContent = <div>
                              <div className="row block block-with-padding">
                                {availableContent}
                              </div>
                            </div>
    return !this.state.authorized ? unauthorizedContent : authorizedContent
  },
})


function extractDay(string){
  var query = url.parse(string, true).query
  return query.day || moment().format(constants.dayFormat)
}
