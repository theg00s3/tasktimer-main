import { GET_POMODOROS_FOR_DATE_SUCCESS, GET_POMODOROS_FOR_DATE_ERROR } from '../actions'

export const defaultState = {
  pomodorosForDate: {
    date: undefined,
    pomodoros: []
  }
}

export default function user (state = defaultState, action) {
  switch (action.type) {
    case GET_POMODOROS_FOR_DATE_SUCCESS:
      return Object.assign({}, state, {
        pomodorosForDate: {
          date: action.payload.date,
          pomodoros: action.payload.pomodoros
        }
      })
    case GET_POMODOROS_FOR_DATE_ERROR:
      return Object.assign({}, state, {
        pomodorosForDate: defaultState.pomodorosForDate
      })
    default:
      return state
  }
}
