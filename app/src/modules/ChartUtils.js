module.exports = {
  getPieChartDataFrom: getPieChartDataFrom
}

var _ = require('underscore')
  , PomodoroUtils = require('../../../shared/PomodoroUtils')

var colorPomodoro = "#DF2E2E"
  , colorBreak = "#24b524"
  , defaultChartData = [{
    value: 0,
    color: colorPomodoro,
    highlight: colorPomodoro,
    label: "Pomodori"
  },
  {
    value: 0,
    color: colorBreak,
    highlight: colorBreak,
    label: "Breaks"
  }]

function getPieChartDataFrom(data, _chartData){
  var chartData = _chartData || defaultChartData

  return _.reduce(data, function(memo, pomodoro){
    var indexType = pomodoro.type === 'pomodoro' ? 0 : 1
    memo[indexType].value += PomodoroUtils.getDurationInMinutes(pomodoro)
    return memo
  }, chartData)
}
