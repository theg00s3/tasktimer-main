var TimerService

var expect = require('chai').expect


describe('TimerService', function () {
  beforeEach(function () {
    TimerService = require('./TimerService')
  })

  it('refuses to start a timer with invalid seconds', function () {
    expect( TimerService.start(123.2) ).not.to.be.ok
    expect( TimerService.start(-1) ).not.to.be.ok
  })

  it('starts a timer with given seconds', function () {
    expect( TimerService.start(25*60) ).to.be.ok
  })

  it('refuses to start another timer when one is in progress', function () {
    TimerService.start(25*60)
    expect( TimerService.start(25*60) ).not.to.be.ok
  })

  it('stops a timer', function () {
    TimerService.start(25*60)
    expect( TimerService.stop() ).to.be.ok
  })

  it('returns the remaining time', function () {
    expect( TimerService.getRemaining() ).to.be.ok
  })

})
