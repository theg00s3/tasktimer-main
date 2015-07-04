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
    it('refuses to start a timer with invalid seconds', function () {
      expect( Timer.start("123.2") ).not.to.be.ok
      expect( Timer.start("123") ).not.to.be.ok
      expect( Timer.start([]) ).not.to.be.ok
      expect( Timer.start(123.2) ).not.to.be.ok
      expect( Timer.start(-1) ).not.to.be.ok
      expect( Timer.start(0) ).not.to.be.ok
    })

    it('starts a timer with given seconds', function () {
      expect( Timer.start(25*60) ).to.be.ok
    })

    it('tells if Timer is in progress', function () {
      expect( Timer.start(25*60) ).to.be.ok
      expect( Timer.isInProgress() ).to.be.true
      expect( Timer.stop() ).to.be.ok
      expect( Timer.isInProgress() ).to.be.false
    })

    it('refuses to start another timer when one is in progress', function () {
      Timer.start(25*60)
      expect( Timer.start(25*60) ).not.to.be.ok
    })

    it('stops a timer', function () {
      Timer.start(25*60)
      expect( Timer.stop() ).to.be.ok
    })

    it('returns the remaining time', function () {
      expect( Timer.start(25*60) ).to.be.ok
      clock.tick(1000)
      expect( Timer.getRemaining() ).to.eql( 25*60 -1 )
    })
  })

  describe('events', function () {
    var callback = sinon.spy()
    beforeEach(function () {
      callback.reset()
    })
    it('adds a listener for tick event', function () {
      Timer.on('tick', callback)
      Timer.start(25*60)
      expect( callback.called ).to.be.true
    })

    it('stops tick callback when timer is stopped', function () {
      Timer.on('tick', callback)
      Timer.start(25*60)
      callback.reset()
      Timer.stop()
      clock.tick(1000)
      expect( callback.called ).not.to.be.true
    })

    it('removes listener for tick event', function () {
      Timer.on('tick', callback)
      Timer.start(25*60)
      callback.reset()
      Timer.off('tick', callback)
      clock.tick(1000)
      expect( callback.called ).not.to.be.true
    })

    it('adds a listener for end event', function () {
      Timer.on('end', callback)
      Timer.start(1)
      expect( callback.called ).not.to.be.true
      clock.tick(1000)
      expect( callback.called ).to.be.true
    })
  })

})
