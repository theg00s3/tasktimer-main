/* global expect */
import TimeFormatter from './TimeFormatter'

describe('TimeFormatter', () => {
  it('formats seconds to timer display', () => {
    expect(TimeFormatter.formatSeconds(60)).toEqual('01:00')
    expect(TimeFormatter.formatSeconds(10)).toEqual('00:10')
    expect(TimeFormatter.formatSeconds(-1)).toEqual('00:00')
    expect(TimeFormatter.formatSeconds(0)).toEqual('00:00')
    expect(TimeFormatter.formatSeconds(undefined)).toEqual('00:00')
  })
})
