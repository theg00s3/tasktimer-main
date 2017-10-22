import {STOP_TIMER, END_TIMER} from '../actions'

export const defaultState = []

export default function pomodoros (state = defaultState, action) {
  switch (action.type) {
    case STOP_TIMER:
    case END_TIMER: {
      return state.concat([action.payload.pomodoro])
    }
  }
  return state
}
