import Pomodoro from './Pomodoro'

const pomodoroJSON = {
  type: 'pomodoro',
  minutes: 25,
  startedAt: '2016-01-03T21:00:00.000Z'
}
const cancelledPomodoroJSON = {
  type: 'pomodoro',
  minutes: 25,
  startedAt: '2016-01-03T21:00:00.000Z',
  cancelledAt: '2016-01-03T21:05:00.000Z'
}
// const breakJSON = {
//   type: 'break',
//   minutes: 5,
//   startedAt: '2016-01-03T21:00:00.000Z'
// }

const MINUTES = 60 * 1000

describe('Pomodoro', function () {
  it('#toJSON', () => {
    const pomodoro = new Pomodoro(pomodoroJSON)
    expect(pomodoro.toJSON()).toStrictEqual(pomodoroJSON)
  })

  describe('#duration', () => {
    it('for not cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(pomodoroJSON)
      expect(pomodoro.duration()).toEqual(25 * MINUTES)
    })

    it('for cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(cancelledPomodoroJSON)
      expect(pomodoro.duration()).toEqual(5 * MINUTES)
    })
  })

  it('#isType', () => {
    const pomodoro = new Pomodoro(pomodoroJSON)
    expect(pomodoro.isType('pomodoro')).toEqual(true)
  })

  describe('#timestamps', () => {
    it('for not cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(pomodoroJSON)
      const timestamps = pomodoro.timestamps()
      expect(timestamps.startedAt).toEqual(new Date(pomodoro.startedAt).getTime())
      expect(timestamps.ended_at).toEqual(new Date(pomodoro.startedAt).getTime() + pomodoro.minutes * MINUTES)
    })

    it('for cancelled pomodoro', () => {
      const pomodoro = new Pomodoro(cancelledPomodoroJSON)
      const timestamps = pomodoro.timestamps()
      expect(timestamps.startedAt).toEqual(new Date(pomodoro.startedAt).getTime())
      expect(timestamps.ended_at).toEqual(new Date(pomodoro.cancelledAt).getTime())
    })
  })

  it('#isCancelled', () => {
    const instance1 = new Pomodoro(pomodoroJSON)
    expect(instance1.isCancelled()).toEqual(false)

    const instance2 = new Pomodoro(cancelledPomodoroJSON)
    expect(instance2.isCancelled()).toEqual(true)
  })

  it('#cancel', () => {
    const pomodoro = new Pomodoro(pomodoroJSON)
    expect(pomodoro.isCancelled()).toEqual(false)

    pomodoro.cancel()

    expect(pomodoro.isCancelled()).toEqual(true)
    expect(pomodoro.cancelledAt).toBeDefined()
  })

  it('Pomodoro#create', () => {
    const pomo = Pomodoro.create({ type: 'pomodoro', minutes: 25 })
    expect(pomo instanceof Pomodoro).toEqual(true)
  })
})
