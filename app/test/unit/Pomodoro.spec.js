describe('Pomodoro', function() {
  var Pomodoro
    , Timer

  beforeEach(inject(function(_Pomodoro_,_Timer_){
    Pomodoro = _Pomodoro_
    Timer = _Timer_
  }))


  it('instantiates a Pomodoro passed 25 minutes and type pomodoro', function() {
    Pomodoro.start(25,'pomodoro')
    var data = Pomodoro.getData()
    expect(data.minutes).toEqual(25)
    expect(data.type).toEqual('pomodoro')
  })

  it('instantiates a Pomodoro passed 5 minutes and type break', function() {
    Pomodoro.start(5,'break')
    var data = Pomodoro.getData()
    expect(data.minutes).toEqual(5)
    expect(data.type).toEqual('break')
  })

  it('returns the type', function() {
    var type = 'break'
    Pomodoro.start(5,type)
    expect(Pomodoro.getType()).toEqual(type)
  })

  it('returns minutes', function() {
    var minutes = 5
    Pomodoro.start(minutes,'break')
    expect(Pomodoro.getMinutes()).toEqual(minutes)
  })

  it('returns the pomodoro data', function () {
    var now = moment()
    Pomodoro.start(25,'pomodoro')
    expect( Pomodoro.getData() ).toEqual({
      startedAt: now.toISOString(),
      minutes: 25,
      type: 'pomodoro',
      tags: [],
      distractions: []
    })
  })

  it('can be stopped', function() {
    Pomodoro.start(5,'break')
    expect(function(){
      Pomodoro.stop()
    }).not.toThrow()
    expect( Pomodoro.timer().inProgress() ).toBeFalsy()
  })

  it('throws when invoked with invalid arguments', function() {
    expect(function(){
      Pomodoro.start(-25,'pomodoro')
    }).toThrow()
    expect(function(){
      Pomodoro.start(50,'pomodoro')
    }).toThrow()
    expect(function(){
      Pomodoro.start(25,'not-a-pomodoro')
    }).toThrow()
  })

  it('throws when started while another timer is ticking', function() {
    Pomodoro.start(25,'pomodoro')
    expect(function(){
      Pomodoro.start(25,'pomodoro')
    }).toThrow()
  })

  it('returns the timer', function() {
    Pomodoro.start(25,'pomodoro')
    var timer = Pomodoro.timer()
    expect(timer instanceof Timer).toBeTruthy()
  })

  it('records a distraction', function () {
    Pomodoro.start(25,'pomodoro')
    Pomodoro.recordDistraction()
    var data = Pomodoro.getData()
    expect( data.distractions.length ).toEqual( 1 )
  })

})
