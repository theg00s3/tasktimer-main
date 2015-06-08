module.exports = {
  getPieChartDataFrom: getPieChartDataFrom
}

function getPieChartDataFrom(data){
  var chartData = [{
    value: 0,
    color:"#DF2E2E",
    highlight: "#DF2E2E",
    label: "Pomodori"
  },
  {
    value: 0,
    color: "#24b524",
    highlight: "#24b524",
    label: "Breaks"
  }]

  return _.reduce(data, function(memo, pomodoro){
    var indexType = pomodoro.type === 'pomodoro' ? 0 : 1
    memo[indexType].value += PomodoroUtils.getDurationInMinutes(pomodoro)
    return memo
  }, chartData)
}
