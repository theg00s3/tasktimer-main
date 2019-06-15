import {LOAD_USER_REQUEST, LOAD_USER_ERROR, LOAD_USER_SUCCESS, GET_POMODOROS_FOR_DATE_REQUEST, GET_POMODOROS_FOR_DATE_ERROR, GET_POMODOROS_FOR_DATE_SUCCESS} from '../actions'

export const defaultState = {
  loadingUser: false,
  loadingPomodorosForDay: false
}

export default function loading (state = defaultState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loadingUser: true
      }
    case LOAD_USER_SUCCESS:
    case LOAD_USER_ERROR:
      return {
        ...state,
        loadingUser: false
      }
    case GET_POMODOROS_FOR_DATE_REQUEST:
      return {
        ...state,
        loadingPomodorosForDay: true
      }
    case GET_POMODOROS_FOR_DATE_SUCCESS:
    case GET_POMODOROS_FOR_DATE_ERROR:
      return {
        ...state,
        loadingPomodorosForDay: false
      }
  }
  return state
}
