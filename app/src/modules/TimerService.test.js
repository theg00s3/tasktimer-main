var TimerService = require('./TimerService')

var expect = require('chai').expect


describe('TimerService', function () {
  it('starts a timer', function () {
    expect( TimerService.start() ).to.be.ok
  })
})
