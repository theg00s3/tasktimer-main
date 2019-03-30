import Timer from './Timer'
import sinon from 'sinon'
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
      expect(Timer.start(25 * 60)).toBeTruthy()
      expect(Timer.start('123.2')).toBeFalsy()
      expect(Timer.start('123')).toBeFalsy()
      expect(Timer.start([])).toBeFalsy()
      expect(Timer.start(123.2)).toBeFalsy()
      expect(Timer.start(-1)).toBeFalsy()
      expect(Timer.start(0)).toBeFalsy()
    })
    it('#isInProgress', () => {
      Timer.start(25 * 60)
      expect(Timer.isInProgress()).toEqual(true)
      Timer.forceEnd()
      expect(Timer.isInProgress()).toEqual(false)
    })

    it('#start when in progress is not allowed', () => {
      Timer.start(25 * 60)
      expect(Timer.start(25 * 60)).toBeFalsy()
    })

    it('#forceEnd', () => {
      Timer.start(25 * 60)
      expect(Timer.forceEnd()).toEqual(0)
    })

    it('#getRemaining', () => {
      expect(Timer.start(25 * 60)).toBeTruthy()
      clock.tick(1000)
      expect(Timer.getRemaining()).toEqual(25 * 60 - 1)
    })
  })

  describe('events', () => {
    const callback = sinon.spy()
    afterEach(() => {
      callback.resetHistory()
      Timer.off('tick', callback)
      Timer.off('end', callback)
      Timer.off('start', callback)
    })
    it('#on "tick"', () => {
      Timer.on('tick', callback)
      Timer.start(25 * 60)
      clock.tick(100)
      expect(callback.called).toBeTruthy()
      expect(callback.calledWith(25 * 60, 25 * 60)).toBeTruthy()
    })

    it('#on "start"', () => {
      Timer.on('start', callback)
      Timer.start(25 * 60)
      expect(callback.called).toEqual(true)
      expect(callback.calledWith(25 * 60)).toEqual(true)
    })

    it('#on "tick" forceEnds when timer is forceEndped', () => {
      Timer.on('tick', callback)
      Timer.start(25 * 60)
      clock.tick(1000)
      expect(callback.called).toEqual(true)
      Timer.forceEnd()
      callback.resetHistory()
      clock.tick(1000)
      expect(callback.called).not.toEqual(true)
    })

    it('#off "tick"', () => {
      Timer.on('tick', callback)
      Timer.start(25 * 60)
      callback.resetHistory()
      Timer.off('tick', callback)
      clock.tick(1000)
      expect(callback.called).not.toEqual(true)
    })

    it('#on "end"', () => {
      Timer.on('end', callback)
      Timer.start(1)
      expect(callback.called).not.toEqual(true)
      clock.tick(1000)
      expect(callback.called).toEqual(true)
    })
  })
})
