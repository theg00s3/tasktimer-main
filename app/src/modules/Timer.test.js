/* eslint-disable no-unused-expressions */
/* global sinon expect */

import Timer from './Timer'
let clock

describe('Timer', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers(1000 * 60 * 60)
  })
  afterEach(() => {
    Timer.forceEnd()
    clock.restore()
  })

  describe('behaviour', () => {
    it('#start', () => {
      expect(Timer.start(25 * 60)).to.be.ok
      expect(Timer.start('123.2')).not.to.be.ok
      expect(Timer.start('123')).not.to.be.ok
      expect(Timer.start([])).not.to.be.ok
      expect(Timer.start(123.2)).not.to.be.ok
      expect(Timer.start(-1)).not.to.be.ok
      expect(Timer.start(0)).not.to.be.ok
    })
    it('#isInProgress', () => {
      Timer.start(25 * 60)
      expect(Timer.isInProgress()).to.be.true
      Timer.forceEnd()
      expect(Timer.isInProgress()).to.be.false
    })

    it('#start when in progress is not allowed', () => {
      Timer.start(25 * 60)
      expect(Timer.start(25 * 60)).not.to.be.ok
    })

    it('#forceEnd', () => {
      Timer.start(25 * 60)
      expect(Timer.forceEnd()).to.eql(0)
    })

    it('#getRemaining', () => {
      expect(Timer.start(25 * 60)).to.be.ok
      clock.tick(1000)
      expect(Timer.getRemaining()).to.eql(25 * 60 - 1)
    })
  })

  describe('events', () => {
    const callback = sinon.spy()
    afterEach(() => {
      callback.reset()
      Timer.off('tick', callback)
      Timer.off('end', callback)
      Timer.off('start', callback)
    })
    it('#on "tick"', () => {
      Timer.on('tick', callback)
      Timer.start(25 * 60)
      clock.tick(100)
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith(25 * 60, 25 * 60)
    })

    it('#on "start"', () => {
      Timer.on('start', callback)
      Timer.start(25 * 60)
      expect(callback.called).to.be.true
      expect(callback.calledWith(25 * 60)).to.be.true
    })

    it('#on "tick" forceEnds when timer is forceEndped', () => {
      Timer.on('tick', callback)
      Timer.start(25 * 60)
      clock.tick(1000)
      expect(callback.called).to.be.true
      Timer.forceEnd()
      callback.reset()
      clock.tick(1000)
      expect(callback.called).not.to.be.true
    })

    it('#off "tick"', () => {
      Timer.on('tick', callback)
      Timer.start(25 * 60)
      callback.reset()
      Timer.off('tick', callback)
      clock.tick(1000)
      expect(callback.called).not.to.be.true
    })

    it('#on "end"', () => {
      Timer.on('end', callback)
      Timer.start(1)
      expect(callback.called).not.to.be.true
      clock.tick(1000)
      expect(callback.called).to.be.true
    })
  })
})
