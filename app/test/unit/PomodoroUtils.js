var expect = require('chai').expect

describe('PomodoroUtils', function () {
  var PomodoroUtils = require('../../src/modules/PomodoroUtils')

  it('calculates the duration of a pomodoro', function () {
    var pomodoro = {
      minutes: 25,
      startedAt: Date.now()
    }
    expect( PomodoroUtils.getDuration(pomodoro) ).to.equal(25*60)
  })
  it('calculates the duration of a cancelled pomodoro', function () {
    var pomodoro = {
      minutes: 25,
      startedAt: Date.now() - 20*60*1000,
      cancelledAt: Date.now()
    }
    expect( PomodoroUtils.getDuration(pomodoro) ).to.equal(20*60)
  })
})
