/* eslint-disable no-unused-expressions */
/* global expect */

import Pomodoro from './Pomodoro'

const pomodoroJSON = {
  type: 'pomodoro',
  minutes: 25,
  started_at: '2016-01-03T21:00:00.000Z'
}
const cancelledPomodoroJSON = {
  type: 'pomodoro',
  minutes: 25,
  started_at: '2016-01-03T21:00:00.000Z',
  cancelled_at: '2016-01-03T21:05:00.000Z'
}
// const breakJSON = {
//   type: 'break',
//   minutes: 5,
//   started_at: '2016-01-03T21:00:00.000Z'
// }

const MINUTES = 60 * 1000

describe('Pomodoro', function () {
  it('#toJSON', () => {
    const pomodoro = new Pomodoro(pomodoroJSON)
    expect(pomodoro.toJSON()).to.deep.eql(pomodoroJSON)
  })

  describe('#duration', () => {
    it('for not cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(pomodoroJSON)
      expect(pomodoro.duration()).to.eql(25 * MINUTES)
    })

    it('for cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(cancelledPomodoroJSON)
      expect(pomodoro.duration()).to.eql(5 * MINUTES)
    })
  })

  it('#isType', () => {
    const pomodoro = new Pomodoro(pomodoroJSON)
    expect(pomodoro.isType('pomodoro')).to.be.true
  })

  describe('#timestamps', () => {
    it('for not cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(pomodoroJSON)
      const timestamps = pomodoro.timestamps()
      expect(timestamps)
        .to.have.property('started_at')
        .that.deep.eql((new Date(pomodoro.started_at)).getTime())
      expect(timestamps)
        .to.have.property('ended_at')
        .that.deep.eql((new Date(pomodoro.started_at)).getTime() + pomodoro.minutes * MINUTES)
    })

    it('for cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(cancelledPomodoroJSON)
      const timestamps = pomodoro.timestamps()
      expect(timestamps)
        .to.have.property('started_at')
        .that.deep.eql((new Date(pomodoro.started_at)).getTime())
      expect(timestamps)
        .to.have.property('ended_at')
        .that.deep.eql((new Date(pomodoro.cancelled_at)).getTime())
    })
  })

  it('#isCancelled', () => {
    const instance1 = new Pomodoro(pomodoroJSON)
    expect(instance1.isCancelled()).to.be.false

    const instance2 = new Pomodoro(cancelledPomodoroJSON)
    expect(instance2.isCancelled()).to.be.true
  })

  it('#cancel', () => {
    const pomodoro = new Pomodoro(pomodoroJSON)
    expect(pomodoro.isCancelled()).to.be.false

    pomodoro.cancel()

    expect(pomodoro.isCancelled()).to.be.true
    expect(pomodoro.cancelled_at).to.be.ok
  })

  it('Pomodoro#create', () => {
    expect(Pomodoro.create({type: 'pomodoro', minutes: 25})).to.be.an.instanceof(Pomodoro)
  })
})
