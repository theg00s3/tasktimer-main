var TimerService

var expect = require('chai').expect


describe('TimerService', function () {
  beforeEach(function () {
    TimerService = require('./TimerService')
  })

  it('starts a timer', function () {
    expect( TimerService.start() ).to.be.ok
  })

  it('refuses to start another timer when one is in progress', function () {
    TimerService.start()
    expect( TimerService.start() ).not.to.be.ok
  })

  it('stops a timer', function () {
    TimerService.start()
    expect( TimerService.stop() ).to.be.ok
  })

  it('returns the remaining time', function () {
    expect( TimerService.getRemaining() ).to.be.ok
  })

})
