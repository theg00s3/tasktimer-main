var TimerService

var expect = require('chai').expect


describe('TimerService', function () {
  beforeEach(function () {
    TimerService = require('./TimerService')
  })

  it('starts a timer', function () {
    expect( TimerService.start() ).to.be.ok
  })
})
