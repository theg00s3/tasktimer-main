angular.module('app')
.controller('StatisticsDailyCtrl', function($scope,Keyboard,PomodoroResource,Statistics,$state,TimeValidator,constants,utils){
  var vm = this

  StatisticsBase.apply(this,arguments)

  if( $state.params.day && !TimeValidator.validateDay($state.params.day) ){
    $state.go('statistics.daily',{ day: utils.getCurrentDay() })
    return
  }

  var selectedDay = $state.params.day || utils.getCurrentDay()
  vm.selected = getReadableDay(selectedDay)

  PomodoroResource.query({
    day: selectedDay
  }).$promise.then(function(pomodori){
    vm.dataAvailable = pomodori.length > 0
    vm.statistics = Statistics.getStatisticsForDay(pomodori)
  },function(){
    vm.dataAvailable = false
    console.log('daily query fail', arguments)
  })


  vm.hasNext = function(){
    return moment(selectedDay,constants.dateFormat)
      .isBefore(moment()
      .subtract(1,'day'))
  }

  vm.goToNext = function(){
    var day =
      moment(selectedDay,constants.dateFormat)
        .add(1,'day')
        .format(constants.dateFormat)
    $state.go('statistics.daily', {day:day})
  }

  vm.goToPrev = function(){
    var day =
      moment(selectedDay,constants.dateFormat)
        .subtract(1,'day')
        .format(constants.dateFormat)
    $state.go('statistics.daily', {day:day})
  }

  function getReadableDay(day){
    var todayMoment = moment().startOf('day'),
        today = todayMoment.format(constants.dateFormat),
        dayMoment = moment(day,constants.dateFormat).startOf('day')

    if( dayMoment.isAfter(todayMoment) ){ return '' }
    if( day===today ){ return 'Today' }
    if( todayMoment.diff(dayMoment,'days') === 1 ) {return 'Yesterday' }
    return moment(dayMoment).format(constants.readableDateFormat)
  }
})
