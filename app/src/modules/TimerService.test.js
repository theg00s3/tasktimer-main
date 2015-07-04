var TimerService = require('./TimerService')
  , Timer = require('./Timer')

var expect = require('chai').expect
  , sinon = require('sinon')

describe('TimerService', function () {
  it('subscribes to Timer on tick event', function () {
    var mockTimer = sinon.mock(Timer)
    mockTimer.expects('on').once().withArgs('tick').returns(Timer)

    TimerService.start(mockTimer.object)

    mockTimer.verify()
  })
})
