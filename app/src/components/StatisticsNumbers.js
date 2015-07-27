var React = require('react')

var StatisticsUtils = require('../modules/StatisticsUtils')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      allPomodoroCount: 0,
      partialPomodoroCount: 0,
      fullPomodoroHours: 0,
    }
  },
  componentDidMount: function(){
    var allPomodoroCount = StatisticsUtils.getAllPomodoroCount(this.props.data)
    var partialPomodoroCount = allPomodoroCount - StatisticsUtils.getFullPomodoroCount(this.props.data)
    var fullPomodoroHours = StatisticsUtils.getFullPomodoroHours(this.props.data)
    this.setState({
      allPomodoroCount: allPomodoroCount,
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
                  <span className="number">{this.state.allPomodoroCount}</span>
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
