/* global expect */
import TimeFormatter from './TimeFormatter'

describe('TimeFormatter', () => {
  it('formats seconds to timer display', () => {
    expect(TimeFormatter.formatSeconds(60)).to.equal('01:00')
    expect(TimeFormatter.formatSeconds(10)).to.equal('00:10')
    expect(TimeFormatter.formatSeconds(-1)).to.equal('00:00')
    expect(TimeFormatter.formatSeconds(0)).to.equal('00:00')
    expect(TimeFormatter.formatSeconds(undefined)).to.equal('00:00')
  })
})
