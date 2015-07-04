var expect = require('chai').expect
  , sinon = require('sinon')

var TimerService
  , Timer = require('./Timer')
  , MockTimer = sinon.mock(Timer)


describe('TimerService', function () {
  beforeEach(function () {
    TimerService = require('./TimerService')
  })

  afterEach(function () {
    MockTimer.restore()
  })

  it('subscribes to Timer on tick event', function () {
    MockTimer.expects('on').once().withArgs('tick').returns(Timer)

    TimerService.start(MockTimer.object)

    MockTimer.verify()
  })
})
