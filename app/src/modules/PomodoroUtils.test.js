describe('PomodoroUtils', function () {
  var PomodoroUtils = require('./PomodoroUtils')

  it('calculates the duration of a pomodoro', function () {
    var pomodoro = {
      minutes: 25,
      started_at: "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)"
    }
    expect( PomodoroUtils.calculateDuration(pomodoro) ).to.equal(25*60)
  })
  it('calculates the duration of a cancelled pomodoro', function () {
    var pomodoro = {
      minutes: 25,
      started_at: "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)",
      cancelled_at: "Sat Jul 04 2015 18:05:00 GMT+0200 (CEST)"
    }
    expect( PomodoroUtils.calculateDuration(pomodoro) ).to.equal(5*60)
  })
  it('calculates the duration in minutes', function () {
    var pomodoro = {
      minutes: 25,
      started_at: "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)"
    }
    expect( PomodoroUtils.calculateDurationInMinutes(pomodoro) ).to.equal(25)
  })
  it('calculates the duration in hours', function () {
    var pomodoro = {
      minutes: 25,
      started_at: "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)"
    }
    expect( PomodoroUtils.calculateDurationInHours(pomodoro) ).to.equal( 0.41 )
  })
  it('calculates the duration in hours for a cancelled pomodoro', function () {
    var pomodoro = {
      minutes: 25,
      started_at: "Sat Jul 04 2015 18:00:00 GMT+0200 (CEST)",
      cancelled_at: "Sat Jul 04 2015 18:05:00 GMT+0200 (CEST)"
    }
    expect( PomodoroUtils.calculateDurationInHours(pomodoro) ).to.equal( 0.08 )
  })
  it('converts minutes to format in hours', function () {
    var minutes = 25
    var expectedDuration = '00:25'
    expect( PomodoroUtils.minutesToDuration(minutes) ).to.deep.equal( expectedDuration )
  })
  it('refuses to convert invalid minutes', function () {
    var minutes = -1
    var expectedHours = '00:00'
    expect( PomodoroUtils.minutesToDuration(minutes) ).to.deep.equal( expectedHours )
  })
})
