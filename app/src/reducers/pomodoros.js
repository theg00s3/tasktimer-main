import {STOP_TIMER, END_TIMER, TEST_POMODOROS} from '../actions'

export const defaultState = []

export default function pomodoros (state = defaultState, action) {
  switch (action.type) {
    case STOP_TIMER:
    case END_TIMER: {
      return state.concat([action.payload.pomodoro])
    }
    case TEST_POMODOROS: {
      const now = Date.now() // +new Date()
      const MINUTES = 1000 * 60

      return [{
        minutes: 25, type: 'pomodoro', started_at: new Date(now - MINUTES * 75), completed: true
      }, {
        minutes: 5, type: 'break', started_at: new Date(now - MINUTES * 47), completed: true
      }, {
        minutes: 25, type: 'pomodoro', started_at: new Date(now - MINUTES * 41), completed: true
      }, {
        minutes: 25, type: 'pomodoro', started_at: new Date(now - MINUTES * 15), completed: true
      }, {
        minutes: 25, type: 'pomodoro', started_at: new Date(now + MINUTES * 15), completed: true
      }]
    }
  }
  return state
}
