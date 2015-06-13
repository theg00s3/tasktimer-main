var Timer = require('./Timer')

var expect = require('chai').expect
var sinon = require('sinon')
var clock



describe('Timer', function () {
  afterEach(function(){
    Timer.stop()
  })
  before(function () {
    clock = sinon.useFakeTimers()
    // start at a given point in time (instead of at 0)
    clock.tick(1000*60*60)
  })
  after(function () {
    clock.restore()
  })

  describe('behaviour', function () {
    it('refuses to start a timer with invalid seconds', function () {
      expect( Timer.start(123.2) ).not.to.be.ok
      expect( Timer.start(-1) ).not.to.be.ok
    })

    it('starts a timer with given seconds', function () {
      expect( Timer.start(25*60) ).to.be.ok
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
      clock.tick(1)
      expect( Timer.getRemaining() ).to.be.ok
      expect( Timer.getRemaining() ).to.eql( 25*60 -1 )
    })
  })

})
