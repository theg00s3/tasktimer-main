var React = require('react')

var StatisticsUtils = require('../modules/StatisticsUtils')

module.exports = React.createClass({
  render: function(){
    return  <div className="statistics-numbers-container">
              <div>
                <div>
                  <span className="number">{StatisticsUtils.getPartialPomodoroCount(this.props.data)}</span>
                  <span className="text">pomodori</span>
                  <br/>
                  <span className="small">
                    of which <strong>{StatisticsUtils.getPartialPomodoroCount(this.props.data) - StatisticsUtils.getFullPomodoroCount(this.props.data)}</strong> are partial
                  </span>
                </div>
              </div>
              <div>
                <span className="number">{StatisticsUtils.getFullPomodoroHours(this.props.data)}</span>
                <span className="text">hours</span>
              </div>
            </div>
  }
})
