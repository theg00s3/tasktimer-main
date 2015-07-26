var StatisticsUtils = require('./StatisticsUtils')

var expect = require('chai').expect

describe('StatisticsUtils', function () {
  var data = require('../../fixtures/timelineData.json')

  it('calculates pomodoro count', function () {
    var pomodoroCount = StatisticsUtils.getPomodoroCount(data)
    expect( pomodoroCount ).to.eql( 2 )
  })
})
