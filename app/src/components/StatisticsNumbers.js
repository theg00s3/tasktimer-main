var React = require('react')

var StatisticsUtils = require('../modules/StatisticsUtils')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      fullPomodoroCount: 0,
      partialPomodoroCount: 0,
      fullPomodoroHours: 0,
    }
  },
  componentDidMount: function(){
    var fullPomodoroCount = StatisticsUtils.getFullPomodoroCount(this.props.data)
    var partialPomodoroCount = StatisticsUtils.getPartialPomodoroCount(this.props.data) - fullPomodoroCount
    var fullPomodoroHours = StatisticsUtils.getFullPomodoroHours(this.props.data)
    this.setState({
      fullPomodoroCount: fullPomodoroCount,
      partialPomodoroCount: partialPomodoroCount,
      fullPomodoroHours: fullPomodoroHours,
    })
  },
  render: function(){
    if( !this.props.data || this.props.data.length === 0 ) {
      return <h3>No data</h3>
    }
    return  <div className="statistics-numbers-container">
              <div>
                <div>
                  <span className="number">{this.state.fullPomodoroCount}</span>
                  <span className="text">pomodori</span>
                  <br/>
                  <span className="small">
                    of which <strong>{this.state.partialPomodoroCount}</strong> are partial
                  </span>
                </div>
              </div>
              <div>
                <span className="number">{this.state.fullPomodoroHours}</span>
                <span className="text">hours</span>
              </div>
            </div>
  }
})
