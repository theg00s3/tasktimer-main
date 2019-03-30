import pomodoro from './pomodoro'
import {startTimer} from '../actions'

describe.skip('pomodoro reducer', () => {
  it('sets state only if not set', () => {
    let action = startTimer(25, 'pomodoro')
    const expectedState = action.payload
    expect(
      pomodoro({}, action)
    ).toStrictEqual(expectedState)

    action = startTimer(5, 'pomodoro')
    const currentState = action.payload
    expect(
      pomodoro(currentState, action)
    ).toStrictEqual(currentState)
  })
})
