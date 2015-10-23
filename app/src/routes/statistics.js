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
  , PomodoroRepository = require('../modules/PomodoroRepository')

var constants = require('../../../shared/constants')

module.exports = function(context){
  var day = extractDay(context.path)
  var dataPromise = PomodoroRepository.getForDay(day)
  React.render(<Statistics day={day} dataPromise={dataPromise}/>, document.querySelector('main'))
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
  },
  componentDidMount: function(){
    document.body.addEventListener('keydown', this._handleKeyboardNavigation)
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
                <div className="limit tac">
                  <h5 className="statistics-day">{this.props.day}</h5>
                  <ArrowNavigation onBack={this._navigateBack} onForward={this._navigateForward}/>
                </div>
              </header>
              <div className="content limit breath">
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
      return  <div className="limit tac">
                <LoginLogout onlyLogin={true} className="big center"/>
                <br/>
                <h6 className="no">to see your statistics</h6>
              </div>
    }

    if( this.state.data.length === 0 ){
      return  <div className="tac light">
                <h1 className="no">Your statistics</h1>
                <p>When you have tracked some work,</p>
                <p>you will see your data displayed here.</p>
                <a href="/" className="button">Start your first pomodoro</a>
              </div>
    }

    var tweetLink = getTweetLinkFor(this.props.day, this.state.data)

    return  <div>
              <div className="limit">
                <StatisticsNumbers data={this.state.data}/>
              </div>
              <Timeline height="200" width="1000" data={this.state.data}/>
              <div className="limit tac">
                <a href={tweetLink} className="twitter-share-link" target="_blank">
                  Tweet your progress! &nbsp;
                  <i className="icon ion-social-twitter"></i>
                </a>
              </div>
            </div>
  },
})

function getTweetLinkFor(day, data){
    var text = encodeURIComponent('On ' + day + ' I worked ' + StatisticsUtils.getAllPomodoroCount(data) + ' pomodori for a total of ' + StatisticsUtils.getAllPomodoroHours(data) + ' hours on https://pomodoro.cc !')
    return 'https://twitter.com/intent/tweet?text='+ text +'&via=pomodoro_cc'
}

function extractDay(string){
  var query = url.parse(string, true).query
  return query.day || moment().format(constants.dayFormat)
}
