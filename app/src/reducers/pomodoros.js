import {STOP_TIMER, END_TIMER, IMPORT_BACKUP} from '../actions'

export const defaultState = []

export default function pomodoros (state = defaultState, action) {
  switch (action.type) {
    case IMPORT_BACKUP:
      state = action.payload.todos
      break
    case STOP_TIMER:
    case END_TIMER: {
      return state.concat([action.payload.pomodoro])
    }
  }
  return state
}
