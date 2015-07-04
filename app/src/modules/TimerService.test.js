var expect = require('chai').expect
  , sinon = require('sinon')

var TimerService
  , Timer = require('./Timer')
  , MockTimer = sinon.mock(Timer)
  , FakeTimer = require('../../fixtures/FakeTimer')


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

  it('calls the collaborator DocumentTitleService.update with remaining time', function () {
    var DocumentTitleService = sinon.spy()
    TimerService.start(FakeTimer, DocumentTitleService)
    expect( DocumentTitleService.called ).to.be.true
  })
})
