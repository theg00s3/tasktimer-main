var expect = require('chai').expect

describe('PomodoroUtils', function () {
  it('calculates the duration of a pomodoro', function () {
    var pomodoro = {
      minutes: 25,
      startedAt: Date.now()
    }
    var PomodoroUtils = require('../../src/modules/PomodoroUtils')
    expect( PomodoroUtils.getDuration(pomodoro) ).to.equal(25*60)
  })
})
