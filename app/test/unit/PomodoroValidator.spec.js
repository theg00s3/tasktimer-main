describe('PomodoroValidator', function() {
  var PomodoroValidator

  var invalidPomodoro = {
    index: -1,
    minutes: -1,
    startedAt: Date.now() + 100000,
    type: 'invalid',
    day: '2013/123',
    week: '2013/123',
    tags: null,
    distractions: null,
  }

  var validPomodoro = {
    index: 0,
    minutes: 25,
    startedAt: Date.now() - 100000,
    type: 'pomodoro',
    day: '07/12/2014',
    week: '42/2014',
    tags: [],
    distractions: [],
  }

  beforeEach(inject(function(_PomodoroValidator_){
    PomodoroValidator = _PomodoroValidator_
  }))
  

  it('does not validate invalid pomodoro', function() {
    expect(PomodoroValidator.validate(invalidPomodoro)).not.toEqual(true)
  })

  it('validates valid pomodoro', function() {
    expect(PomodoroValidator.validate(validPomodoro)).toEqual(true) 
  })

  it('does not validate if distractions are out of pomodoro timespan', function() {
    validPomodoro.distractions = [validPomodoro.startedAt+100*60*1000]
    expect(PomodoroValidator.validate(validPomodoro)).toEqual(["invalid property: 'distractions'"])
  })

})