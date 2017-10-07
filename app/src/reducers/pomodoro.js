/*     */
import {START_TIMER, RESET_TIMER, STOP_TIMER, END_TIMER} from '../actions/timer'

export const defaultState = {}

export default function pomodoro (state = defaultState, action) {
  switch (action.type) {
    case START_TIMER: {
      if (state.minutes !== undefined) {
        return state
      }
      return action.payload
    }
    case STOP_TIMER:
    case RESET_TIMER:
    case END_TIMER: {
      return defaultState
    }
  }
  return state
}
