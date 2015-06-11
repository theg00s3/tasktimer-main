var _ = require('underscore')
  , PomodoroUtils = require('../../../shared/PomodoroUtils')

var colorPomodoro = "#DF2E2E"
  , colorBreak = "#24b524"

module.exports = {
  getPieChartDataFrom: getPieChartDataFrom,
  chartData: getDefaultChartData()
}

function getDefaultChartData(){
  return defaultChartData = [{
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
}



function getPieChartDataFrom(data){
  return _.reduce(data, function(memo, pomodoro){
    var indexType = pomodoro.type === 'pomodoro' ? 0 : 1
    memo[indexType].value += PomodoroUtils.getDurationInMinutes(pomodoro)
    return memo
  }, getDefaultChartData())
}
