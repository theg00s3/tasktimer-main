var Loader = require('react-loader')
  , React = require('react')
  , axios = require('axios')
  ,  _ = require('underscore')
  , moment = require('moment')
  , url = require('url')
  , page = require('page')

var LoginLogout = require('../components/LoginLogout')
  , ArrowNavigation = require('../components/ArrowNavigation')
  , Timeline = require('../components/Timeline')
  , StatisticsNumbers = require('../components/StatisticsNumbers')
  , StatisticsUtils = require('../modules/StatisticsUtils')

var constants = require('../../../shared/constants')

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

var Statistics = React.createClass({
  getInitialState: function(){
    return {
      data: [],
      loaded: false,
      authorized: true
    }
  },
  componentWillUnmount: function(){
    document.body.removeEventListener('keydown', this._handleKeyboardNavigation)
    mainHeader.classList.remove('white')
  },
  componentDidMount: function(){
    document.body.addEventListener('keydown', this._handleKeyboardNavigation)
    mainHeader.classList.add('white')
    this.props.dataPromise
      .then(function(response){
        var data = response.data
        this.setState({
          data: data,
          loaded: true,
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
                <div className="limit">
                  <h1 className="statistics-heading">Statistics</h1>
                  <h5 className="statistics-day">{this.props.day}</h5>
                  <ArrowNavigation onBack={this._navigateBack} onForward={this._navigateForward}/>
                  <div className="statistics-graph-image"></div>
                </div>
              </header>
              <div className="content limit extended breath">
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
    if( !this.state.authorized ){
      return <LoginLogout onlyLogin={true} className="big left"/>
    }

    if( this.state.data.length === 0 ){
      return  <div className="tac light">
                <h1 className="no">Your statistics</h1>
                <p>When you have tracked some work,</p>
                <p>you will see your data displayed here.</p>
                <a href="/" className="button">Start your first pomodoro</a>
              </div>
    }

    return  <div>
              <div className="limit">
                <StatisticsNumbers data={this.state.data}/>
              </div>
              <Timeline height="200" width="1200" data={this.state.data}/>
            </div>
  },
})


function extractDay(string){
  var query = url.parse(string, true).query
  return query.day || moment().format(constants.dayFormat)
}
