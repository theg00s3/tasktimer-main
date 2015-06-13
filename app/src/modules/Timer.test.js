var Timer = require('./Timer')

var expect = require('chai').expect
var sinon = require('sinon')



describe('Timer', function () {
  beforeEach(function () {
    clock = sinon.useFakeTimers()
    clock.tick(1000*60*60)
  })
  afterEach(function () {
    clock.restore()
  })


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
    expect( Timer.getRemaining() ).to.be.ok
  })

})
