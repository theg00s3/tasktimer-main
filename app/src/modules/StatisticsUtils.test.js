var StatisticsUtils = require('./StatisticsUtils')

var expect = require('chai').expect
var _ = require('underscore')

describe('StatisticsUtils', function () {
  var data
  beforeEach(function () {
    var _data = require('../../fixtures/timelineData')
    data = _.clone(_data)
  })

  it('calculates full pomodoro count', function () {
    var pomodoroCount = StatisticsUtils.getFullPomodoroCount(data)
    expect( pomodoroCount ).to.eql( 2 )

    data.push({
      "startedAt": "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)",
      "cancelledAt": "Sat Jul 04 2015 18:05:00 GMT+0200 (CEST)",
      "minutes": 25,
      "type": "pomodoro"
    })
    pomodoroCount = StatisticsUtils.getFullPomodoroCount(data)
    expect( pomodoroCount ).to.eql( 2 )
  })

  it('calculates full pomodoro hours', function () {
    var hours = StatisticsUtils.getFullPomodoroHours(data)
    expect( hours ).to.eql( 0.8 )

    data.push({
      "startedAt": "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)",
      "cancelledAt": "Sat Jul 04 2015 18:05:00 GMT+0200 (CEST)",
      "minutes": 25,
      "type": "pomodoro"
    })
    hours = StatisticsUtils.getFullPomodoroHours(data)
    expect( hours ).to.eql( 0.8 )
  })

  it('calculates partial pomodoro count', function () {
    data.push({
      "startedAt": "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)",
      "cancelledAt": "Sat Jul 04 2015 18:05:00 GMT+0200 (CEST)",
      "minutes": 25,
      "type": "pomodoro"
    })
    var pomodoroCount = StatisticsUtils.getPartialPomodoroCount(data)
    expect( pomodoroCount ).to.eql( 2.2 )
  })
})
