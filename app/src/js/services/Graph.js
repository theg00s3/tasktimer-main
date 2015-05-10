angular.module('app')
.service('Graph', function(StatisticsUtils,TimeFormatter){
  var self = this
  self.getGraphData = function(data){
    if (!data){
      return false
    }

    var graph = {
      data: {},
    }

    var firstPomodoro = getFirstPomodoro(data)
    var lastPomodoro = getLastPomodoro(data)

    var timeSpan = StatisticsUtils.getNormalizedTimeSpan(firstPomodoro,lastPomodoro)
      , timeMax = moment(timeSpan.timeMax)
      , timeMin = moment(timeSpan.timeMin)

    var margin = 5
    graph.data = _.map(data, function(pomodoro, key, list){
      var actualMinutes = getActualMinutesFor(pomodoro)
        , actualMillis  = actualMinutes*60*1000

      var x = StatisticsUtils.percentualValue(timeSpan.timeMin,pomodoro.startedAt,timeSpan.timeMax, margin)
      var y = (100-margin) - actualMinutes*(100-margin)/25

      var width = StatisticsUtils.percentualValue(timeSpan.timeMin, pomodoro.startedAt + actualMillis, timeSpan.timeMax, margin) - x
      var height = actualMinutes*(100-margin)/25

      return {
        x:x + '%',
        startedAt: TimeFormatter.formatTime(pomodoro.startedAt),
        y:y + '%',
        height: height + '%',
        width: width + '%',
        duration: TimeFormatter.formatSeconds(actualMinutes*60),
        percentualDuration: StatisticsUtils.percentualValue(0,actualMinutes,25),
        type: pomodoro.type,
        index: pomodoro.index,
      }
    })

    graph.data = _.filter(graph.data, function(pomodoro, key, list){
      return !!pomodoro
    })

    graph.axis = {}
    graph.axis.x = []

    while( timeMin.isBefore(timeMax) ){
      graph.axis.x.push( TimeFormatter.pad(timeMin.hour()) + ':00' )
      timeMin.add(1,'hour')
    }
    if( graph.axis.x.indexOf(TimeFormatter.pad(timeMin.hour()) + ':00') === -1 ){
      graph.axis.x.push( TimeFormatter.pad(timeMin.hour()) + ':00' )
    }

    return graph
  }

  function getFirstPomodoro(data){
    return _.min(data, function(pomodoro, key, list){return pomodoro.startedAt})
  }

  function getLastPomodoro(data){
    return _.max(data, function(pomodoro, key, list){return pomodoro.startedAt + pomodoro.minutes*60*1000})
  }

  function getActualMinutesFor(pomodoro){
    var actualMinutes = pomodoro.cancelledAt > 0 ? (pomodoro.cancelledAt-pomodoro.startedAt)/1000/60 : pomodoro.minutes
    return actualMinutes > 0 ? actualMinutes : pomodoro.minutes
  }

})
