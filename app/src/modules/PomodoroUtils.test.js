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
  cancelled_at: '2016-01-03T22:05:00.000Z'
}]

describe('PomodoroUtils', () => {
  describe('#fullPomodoriCount', () => {
    it('calculates pomodori count', () => {
      expect(PomodoroUtils.fullPomodoriCount(sample)).to.eql('1')
    })
  })

  describe('#partialPomodoriCount', () => {
    it('calculates pomodori count', () => {
      expect(PomodoroUtils.partialPomodoriCount(sample)).to.eql('1.4')
    })
  })

  describe('#fullPomodoriHours', () => {
    it('calculates pomodori count', () => {
      expect(PomodoroUtils.fullPomodoriHours(sample)).to.eql('0.4')
    })
  })

  describe('#partialPomodoriHours', () => {
    it('calculates pomodori count', () => {
      expect(PomodoroUtils.partialPomodoriHours(sample)).to.eql('0.6')
    })
  })
})
