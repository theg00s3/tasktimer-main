var expect = require('chai').expect
  , sinon = require('sinon')

var TimerService = require('./TimerService')
  , Timer = require('./Timer')
  , FakeTimer = require('../../fixtures/FakeTimer')
  , VoidTimer = require('../../fixtures/VoidTimer')
  , StartTimer = require('../../fixtures/StartTimer')
  , EndTimer = require('../../fixtures/EndTimer')
  , DocumentTitleUpdateCommand = require('./DocumentTitleUpdateCommand')


describe('TimerService', function () {
  it('subscribes to Timer events', function () {
    var MockTimer = sinon.mock(Timer)
    MockTimer.expects('on').once().withArgs('tick').returns(Timer)
    MockTimer.expects('on').once().withArgs('end').returns(Timer)
    MockTimer.expects('on').once().withArgs('start').returns(Timer)

    TimerService.start(Timer)

    MockTimer.verify()
    MockTimer.restore()
  })

  it('updates title with remaining time', function () {
    var MockDocumentTitleUpdateCommand = sinon.mock(DocumentTitleUpdateCommand)
    MockDocumentTitleUpdateCommand.expects('execute').once().withArgs(25*60)

    TimerService.start(FakeTimer, DocumentTitleUpdateCommand)

    MockDocumentTitleUpdateCommand.verify()
    MockDocumentTitleUpdateCommand.restore()
  })
})
