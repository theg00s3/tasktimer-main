var Timer = require('./Timer')

var expect = require('chai').expect
var sinon = require('sinon')
var clock



describe('Timer', function () {
  afterEach(function(){
    Timer.stop()
  })
  before(function () {
    clock = sinon.useFakeTimers(1000*60*60)
  })
  after(function () {
    clock.restore()
  })

  describe('behaviour', function () {
    it('#start', function () {
      expect( Timer.start(25*60) ).to.be.ok

      expect( Timer.start("123.2") ).not.to.be.ok
      expect( Timer.start("123") ).not.to.be.ok
      expect( Timer.start([]) ).not.to.be.ok
      expect( Timer.start(123.2) ).not.to.be.ok
      expect( Timer.start(-1) ).not.to.be.ok
      expect( Timer.start(0) ).not.to.be.ok
    })

    it('#isInProgress', function () {
      expect( Timer.start(25*60) ).to.be.ok
      expect( Timer.isInProgress() ).to.be.true
      expect( Timer.stop() ).to.be.ok
      expect( Timer.isInProgress() ).to.be.false
    })

    it('#start when in progress is not allowed', function () {
      Timer.start(25*60)
      expect( Timer.start(25*60) ).not.to.be.ok
    })

    it('#stop', function () {
      Timer.start(25*60)
      expect( Timer.stop() ).to.be.ok
    })

    it('#getRemaining', function () {
      expect( Timer.start(25*60) ).to.be.ok
      clock.tick(1000)
      expect( Timer.getRemaining() ).to.eql( 25*60 -1 )
    })
  })

  describe('events', function () {
    var callback = sinon.spy()
    afterEach(function () {
      callback.reset()
      Timer.off('tick', callback)
      Timer.off('end', callback)
      Timer.off('start', callback)
    })
    it('#on "tick"', function () {
      Timer.on('tick', callback)
      Timer.start(25*60)
      expect( callback.called ).to.be.true
    })

    it('#on "start"', function () {
      Timer.on('start', callback)
      Timer.start(25*60)
      expect( callback.called ).to.be.true
      expect( callback.calledWith(25*60) ).to.be.true
    })

    it('#on "tick" stops when timer is stopped', function () {
      Timer.on('tick', callback)
      Timer.start(25*60)
      callback.reset()
      Timer.stop()
      clock.tick(1000)
      expect( callback.called ).not.to.be.true
    })

    it('#off "tick"', function () {
      Timer.on('tick', callback)
      Timer.start(25*60)
      callback.reset()
      Timer.off('tick', callback)
      clock.tick(1000)
      expect( callback.called ).not.to.be.true
    })

    it('#on "end"', function () {
      Timer.on('end', callback)
      Timer.start(1)
      expect( callback.called ).not.to.be.true
      clock.tick(1000)
      expect( callback.called ).to.be.true
    })
  })

})
