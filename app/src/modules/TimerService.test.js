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

  it('calls the collaborator DocumentTitleUpdateCommand.execute with remaining time', function () {
    var DocumentTitleUpdateCommand = {
      execute: sinon.spy()
    }
    TimerService.start(FakeTimer, DocumentTitleUpdateCommand)
    expect( DocumentTitleUpdateCommand.execute.called ).to.be.true
    expect( DocumentTitleUpdateCommand.execute.calledWith(25*60) ).to.be.true
  })
})
