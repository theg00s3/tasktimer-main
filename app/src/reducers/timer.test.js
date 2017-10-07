/* global expect */

import timer from './timer'
import {startTimer, tickTimer} from '../actions'

const dummyAction = {type: 'DUMMY', payload: {}}

describe('timer reducer', () => {
  it('default state is "00:00"', () => {
    expect(
      timer(undefined, dummyAction)
    ).to.eql('00:00')
  })

  it.skip('starts timer', () => {
    expect(
      timer(undefined, startTimer(25, 'pomodoro'))
    ).to.eql('25:00')
  })

  it('ticks timer', () => {
    expect(
      timer('25:00', tickTimer(25 * 60 - 1))
    ).to.eql('24:59')
  })
})
