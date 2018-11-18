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
        minutes: 25, type: 'pomodoro', startedAt: new Date(now - MINUTES * 335), completed: true
      }, {
        minutes: 25, type: 'pomodoro', startedAt: new Date(now - MINUTES * 290), completed: true
      }, {
        minutes: 5, type: 'pomodoro', startedAt: new Date(now - MINUTES * 150), completed: true
      }, {
        minutes: 25, type: 'pomodoro', startedAt: new Date(now - MINUTES * 117), completed: true
      }, {
        minutes: 25, type: 'pomodoro', startedAt: new Date(now - MINUTES * 91), completed: true
      }, {
        minutes: 5, type: 'pomodoro', startedAt: new Date(now - MINUTES * 65), completed: true
      }, {
        minutes: 25, type: 'pomodoro', startedAt: new Date(now - MINUTES * 59), completed: true
      }, {
        minutes: 5, type: 'break', startedAt: new Date(now - MINUTES * 32), completed: true
      }, {
        minutes: 25, type: 'pomodoro', startedAt: new Date(now - MINUTES * 26), completed: true
      }, {
        minutes: 25, type: 'pomodoro', startedAt: new Date(now), completed: true
      }]
    }
  }
  return state
}
