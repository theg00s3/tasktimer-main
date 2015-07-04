var expect = require('chai').expect
  , sinon = require('sinon')

var TimerService
  , Timer = require('./Timer')
  , MockTimer = sinon.mock(Timer)
  , FakeTimer = require('../../fixtures/FakeTimer')
  , VoidTimer = require('../../fixtures/VoidTimer')
  , StartTimer = require('../../fixtures/StartTimer')
  , DocumentTitleUpdateCommand = {
    execute: sinon.spy()
  }
  , Buzz = {
    sound: sinon.spy()
  }


describe('TimerService', function () {
  beforeEach(function () {
    TimerService = require('./TimerService')
  })

  afterEach(function () {
    MockTimer.restore()
    DocumentTitleUpdateCommand.execute.reset()
  })

  it('subscribes to Timer events', function () {
    MockTimer.expects('on').once().withArgs('tick').returns(Timer)
    MockTimer.expects('on').once().withArgs('end').returns(Timer)
    MockTimer.expects('on').once().withArgs('start').returns(Timer)

    TimerService.start(MockTimer.object)

    MockTimer.verify()
  })

  it('instanciated sounds', function () {
    TimerService.start(StartTimer, DocumentTitleUpdateCommand, Buzz)
    expect( Buzz.sound.calledWithNew() ).to.be.true
    expect( Buzz.sound.calledWith('/assets/audio/tick.mp3') ).to.be.true
    expect( Buzz.sound.calledWith('/assets/audio/ring.mp3') ).to.be.true
  })

  it('calls the collaborator DocumentTitleUpdateCommand.execute with remaining time', function () {
    TimerService.start(FakeTimer, DocumentTitleUpdateCommand)
    expect( DocumentTitleUpdateCommand.execute.called ).to.be.true
    expect( DocumentTitleUpdateCommand.execute.calledWith(25*60) ).to.be.true
  })

  it('calls DocumentTitleUpdateCommand.execute with 0 when Timer is stopped', function () {
    TimerService.start(VoidTimer, DocumentTitleUpdateCommand)

    expect( DocumentTitleUpdateCommand.execute.called ).to.be.true
    expect( DocumentTitleUpdateCommand.execute.calledWith(0) ).to.be.true
  })
})
