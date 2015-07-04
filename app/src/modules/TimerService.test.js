var expect = require('chai').expect
  , sinon = require('sinon')

var TimerService
  , Timer = require('./Timer')
  , MockTimer = sinon.mock(Timer)
  , FakeTimer = require('../../fixtures/FakeTimer')
  , VoidTimer = require('../../fixtures/VoidTimer')
  , StartTimer = require('../../fixtures/StartTimer')
  , EndTimer = require('../../fixtures/EndTimer')
  , DocumentTitleUpdateCommand = sinon.mock({execute:function(){}})
  , Sounds = {
    tick: sinon.mock({play:function(){},stop:function(){}}),
    ring: sinon.mock({play:function(){},stop:function(){}}),
  }


describe('TimerService', function () {
  beforeEach(function () {
    TimerService = require('./TimerService')
  })

  afterEach(function () {
    MockTimer.restore()
    Sounds.tick.restore()
    Sounds.ring.restore()
    DocumentTitleUpdateCommand.restore()
  })

  it('subscribes to Timer events', function () {
    MockTimer.expects('on').once().withArgs('tick').returns(Timer)
    MockTimer.expects('on').once().withArgs('end').returns(Timer)
    MockTimer.expects('on').once().withArgs('start').returns(Timer)

    TimerService.start(MockTimer.object)

    MockTimer.verify()
  })

  it('starts ticking sound when timer starts', function () {
    Sounds.tick.expects('play').once()

    TimerService.start(StartTimer, {}, {
      tick: Sounds.tick.object,
    })
    
    Sounds.tick.verify()
  })

  it('stops ticking sound when timer ends', function () {
    Sounds.tick.expects('stop').once()

    TimerService.start(EndTimer, {}, {
      tick: Sounds.tick.object,
    })
    
    Sounds.tick.verify()
  })

  it('starts ringing sound when timer ends', function () {
    Sounds.ring.expects('play').once()

    TimerService.start(EndTimer, {}, {
      ring: Sounds.ring.object,
    })
    
    Sounds.ring.verify()
  })

  it('calls the collaborator DocumentTitleUpdateCommand.execute with remaining time', function () {
    DocumentTitleUpdateCommand.expects('execute').once().withArgs(25*60)

    TimerService.start(FakeTimer, DocumentTitleUpdateCommand.object)

    DocumentTitleUpdateCommand.verify()
  })
})
