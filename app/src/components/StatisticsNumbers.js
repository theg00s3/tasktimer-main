var React = require('react')

var StatisticsUtils = require('../modules/StatisticsUtils')
var NumberUtils = require('../../../shared/NumberUtils')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      allPomodoroCount: 0,
      fullPomodoroCount: 0,
      fullPomodoroHours: 0,
      allPomodoroHours: 0,
    }
  },
  componentDidMount: function(){
    var fullPomodoroCount = StatisticsUtils.getFullPomodoroCount(this.props.data)
    var allPomodoroCount = StatisticsUtils.getAllPomodoroCount(this.props.data) - fullPomodoroCount
    var fullPomodoroHours = StatisticsUtils.getFullPomodoroHours(this.props.data)
    var allPomodoroHours = StatisticsUtils.getAllPomodoroHours(this.props.data) - fullPomodoroHours
    allPomodoroCount = NumberUtils.limitDecimals(allPomodoroCount, 1)
    allPomodoroHours = NumberUtils.limitDecimals(allPomodoroHours, 1)
    this.setState({
      allPomodoroCount: allPomodoroCount,
      fullPomodoroCount: fullPomodoroCount,
      fullPomodoroHours: fullPomodoroHours,
      allPomodoroHours: allPomodoroHours,
    })
  },
  render: function(){
    if( !this.props.data || this.props.data.length === 0 ) {
      return null
    }
    return  <div className="statistics-numbers-container">
              <div>
                <span className="number greenish">{this.state.fullPomodoroCount}</span>
                <span className="text">pomodori</span>
                {this._getAllPomodoroCountPiece()}
              </div>
              <div>
                <span className="number greenish">{this.state.fullPomodoroHours}</span>
                <span className="text">hours</span>
                {this._getAllPomodoroHoursPiece()}
              </div>
            </div>
  },
  _getAllPomodoroCountPiece: function(){
    if( this.state.allPomodoroCount === 0 ){
      return null
    }
    return  <div>
              <br/>
              <span className="small">
                <strong className="greenish">+ {this.state.allPomodoroCount}</strong> cancelled pomodori
              </span>
            </div>

  },
  _getAllPomodoroHoursPiece: function(){
    if( this.state.allPomodoroHours === 0 ){
      return null
    }
    return  <div>
                <br/>
                <span className="small">
                  <strong className="greenish">+ {this.state.allPomodoroHours}</strong> hours
                </span>
            </div>

  },
})
