angular.module('app')
.controller('StatisticsWeeklyCtrl', function($scope,Keyboard,PomodoroResource,Statistics,$state,TimeValidator,constants,utils){
  var vm = this

  StatisticsBase.apply(this,arguments)

  if( $state.params.week && !TimeValidator.validateWeek($state.params.week) ){
    $state.go('statistics.weekly',{ week: utils.getCurrentWeek() })
    return
  }

  var selectedWeek = $state.params.week || utils.getCurrentWeek()
  vm.selected = getReadableWeek(selectedWeek)

  PomodoroResource.query({
    week: selectedWeek
  }).$promise.then(function(pomodori){
    vm.dataAvailable = pomodori.length > 0
    vm.statistics = Statistics.getStatisticsForWeek(pomodori)
  },function(){
    vm.dataAvailable = false
    console.log('weekly query fail', arguments)
  })

  vm.hasNext = function(){
    return moment(selectedWeek,constants.weekFormat)
      .isBefore(moment()
      .subtract(1,'week'))
  }

  vm.goToNext = function(){
    var week =
      moment(selectedWeek,constants.weekFormat)
        .add(1,'week')
        .format(constants.weekFormat)
    $state.go('statistics.weekly', {week:week})
  }

  vm.goToPrev = function(){
    var week =
      moment(selectedWeek,constants.weekFormat)
        .subtract(1,'week')
        .format(constants.weekFormat)
    $state.go('statistics.weekly', {week:week})
  }

  function getReadableWeek(week){
    week = week || selectedWeek
    var thisWeekMoment = moment(),
        thisWeek = thisWeekMoment.format(constants.weekFormat),
        weekMoment = moment(week,constants.weekFormat)

    if( week===thisWeek ){ return 'This week' }
    if( thisWeekMoment.diff(weekMoment,'days') === 1 ) {return 'Last week' }
    return 'Week ' + moment(weekMoment).format(constants.weekFormat)
  }
})
