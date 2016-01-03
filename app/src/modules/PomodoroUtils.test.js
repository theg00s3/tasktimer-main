import PomodoroUtils from './PomodoroUtils'
const MINUTES = 1000 * 60
const sample = [{
  type: 'pomodoro',
  minutes: 25,
  started_at: '2016-01-03T21:30:00.000Z'
}, {
  type: 'pomodoro',
  minutes: 25,
  started_at: '2016-01-03T21:55:00.000Z',
  cancelled_at: '2016-01-03T22:05:00.000Z',
}]

describe('PomodoroUtils', () => {
  describe('#pomodoriCount', () => {
    it('for empty data returns 0.0', () => {
      expect( PomodoroUtils.pomodoriCount([]) ).to.eql('0.0')
    })

    it('calculates pomodori count', () => {
      expect( PomodoroUtils.pomodoriCount(sample) ).to.eql('1.4')
    })
  })

  describe('#pomodoriHours', () => {
    it('for empty data returns 0.0', () => {
      expect( PomodoroUtils.pomodoriHours([]) ).to.eql('0.0')
    })

    it('calculates pomodori count', () => {
      expect( PomodoroUtils.pomodoriHours(sample) ).to.eql('0.6')
    })
  })
})
