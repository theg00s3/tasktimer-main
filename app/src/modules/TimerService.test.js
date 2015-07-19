var expect = require('chai').expect
  , sinon = require('sinon')

var TimerService
  , Timer = require('./Timer')
  , MockTimer = sinon.mock(Timer)
  , FakeTimer = require('../../fixtures/FakeTimer')
  , VoidTimer = require('../../fixtures/VoidTimer')
  , StartTimer = require('../../fixtures/StartTimer')
  , EndTimer = require('../../fixtures/EndTimer')
  , DocumentTitleUpdateCommand = require('./DocumentTitleUpdateCommand')
  , MockDocumentTitleUpdateCommand = sinon.mock(DocumentTitleUpdateCommand)


describe('TimerService', function () {
  beforeEach(function () {
    TimerService = require('./TimerService')
    MockTimer.restore()
    MockDocumentTitleUpdateCommand.restore()
  })

  it('subscribes to Timer events', function () {
    MockTimer.expects('on').once().withArgs('tick').returns(Timer)
    MockTimer.expects('on').once().withArgs('end').returns(Timer)
    MockTimer.expects('on').once().withArgs('start').returns(Timer)

    TimerService.start(Timer)

    MockTimer.verify()
  })

  it('calls the collaborator DocumentTitleUpdateCommand.execute with remaining time', function () {
    MockDocumentTitleUpdateCommand.expects('execute').once().withArgs(25*60)

    TimerService.start(FakeTimer, DocumentTitleUpdateCommand)

    MockDocumentTitleUpdateCommand.verify()
  })
})
