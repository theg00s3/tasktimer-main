var React = require('react')

var StatisticsUtils = require('../modules/StatisticsUtils')

module.exports = React.createClass({
  render: function(){
    return  <div className="statistics-numbers-container">
              <div>
                <span className="number">{StatisticsUtils.getFullPomodoroCount(this.props.data)}</span>
                <span className="text">pomodori</span>
              </div>
              <div>
                <span className="number">{StatisticsUtils.getFullPomodoroHours(this.props.data)}</span>
                <span className="text">hours</span>
              </div>
            </div>
  }
})
