describe('Timer', function() {
  var timer
    , $interval

  var startingTime = 1000*60*50
  var minutes = 25

  var callbacks = {
    tick:angular.noop,
    stop:angular.noop,
    finish:angular.noop,
  }
  var spies = {}

  beforeEach(function() {
    inject(function(_Timer_,_$interval_,$httpBackend){
      Timer = _Timer_
      $interval = _$interval_
    })

    resetTime()
    jasmine.clock().install()

    spies.tick = spyOn(callbacks,'tick').and.callThrough()
    spies.stop = spyOn(callbacks,'stop').and.callThrough()
    spies.finish = spyOn(callbacks,'finish').and.callThrough()

    timer = new Timer(minutes*60)
    timer.on('tick', callbacks.tick)
    timer.on('finish', callbacks.finish)
    timer.on('stop', callbacks.stop)
  })


  it('refuses to start a timer with invalid seconds', function() {
    [-1,'fds','1df',NaN,0]
      .forEach(function(sec){
        var t = function(){ new Timer(sec) }
        expect( t ).toThrow()
      })
  })

  it('calls tickCallback when timer starts', function() {
    expect( spies.tick ).toHaveBeenCalled()
  })

  it('reports if in progress', function() {
    expect(timer.inProgress()).toBeTruthy()
    timer.stop()
    expect(timer.inProgress()).toBeFalsy()
  })

  it('returns remainingTime', function() {
    expect( timer.getRemainingTime() ).toEqual(minutes+':00',minutes*60)    
  })

  it('calls tickCallback with remainingTime and remainingSeconds', function() {
    expect( spies.tick ).toHaveBeenCalledWith(minutes+':00',minutes*60)
  })

  it('calls tickCallback after each tick', function() {
    expect( spies.tick ).toHaveBeenCalledWith(minutes+':00',minutes*60)
    forwardTime(1000)
    expect( spies.tick ).toHaveBeenCalledWith((minutes-1)+':59',minutes*60-1)
  })

  it('stops a timer and call stopCallback', function() {
    timer.stop()
    expect( spies.stop ).toHaveBeenCalled()
  })

  it('stops a timer without calling tickCallback', function() {
    spies.tick.calls.reset()
    spies.stop.calls.reset()

    timer.stop()
    expect( spies.stop ).toHaveBeenCalled()
    expect( spies.tick ).not.toHaveBeenCalled()
  })

  it('calls finishCallback once finished', function() {
    for(var i=0; i < minutes*60; i++){
      forwardTime(1000)
    }
    expect( spies.finish ).toHaveBeenCalled()
  })


  function resetTime(){
    Date.now = function(){
      return startingTime
    }
  }

  function forwardTime(ms){
    var now = Date.now()
    Date.now = function(){ return now + ms }
    $interval.flush(ms)
  }

})