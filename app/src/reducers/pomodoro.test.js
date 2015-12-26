import pomodoro, {defaultState} from './pomodoro'
import {startTimer, forceEndTimer} from '../actions'

describe('pomodoro reducer', () => {
  it('sets state only if not set', () => {
    let action = startTimer(25,'pomodoro')
    const expectedState = action.payload
    expect(
      pomodoro({}, action)
    ).to.deep.eql(expectedState)

    action = startTimer(5,'pomodoro')
    const currentState = action.payload
    expect(
      pomodoro(currentState, action)
    ).to.deep.eql(currentState)
  })

  it.skip('when timer is forceEnded or ends resets store', () => {
    let action = forceEndTimer()
    expect(
      pomodoro({}, action)
    ).to.deep.eql(defaultState)
  })
})
