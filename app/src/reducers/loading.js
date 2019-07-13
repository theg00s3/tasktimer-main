import {
  LOAD_USER_REQUEST,
  LOAD_USER_ERROR,
  LOAD_USER_SUCCESS,
  API_GET_TODOLIST,
  API_GET_TODOLIST_SUCCESS,
  API_GET_TODOLIST_ERROR,
  API_GET_POMODOROS_FOR_DATE_REQUEST,
  API_GET_POMODOROS_FOR_DATE_ERROR,
  API_GET_POMODOROS_FOR_DATE_SUCCESS,
  API_GET_ANALYSIS,
  API_GET_ANALYSIS_SUCCESS,
  API_GET_ANALYSIS_ERROR
} from '../actions'

export const defaultState = {
  loadingUser: false,
  loadingTodolist: false,
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
    case API_GET_TODOLIST:
      return {
        ...state,
        loadingTodolist: true
      }
    case API_GET_TODOLIST_SUCCESS:
    case API_GET_TODOLIST_ERROR:
      return {
        ...state,
        loadingTodolist: false
      }
    case API_GET_ANALYSIS:
      return {
        ...state,
        loadingAnalysis: true
      }
    case API_GET_ANALYSIS_SUCCESS:
    case API_GET_ANALYSIS_ERROR:
      return {
        ...state,
        loadingAnalysis: false
      }
    case API_GET_POMODOROS_FOR_DATE_REQUEST:
      return {
        ...state,
        loadingPomodorosForDay: true
      }
    case API_GET_POMODOROS_FOR_DATE_SUCCESS:
    case API_GET_POMODOROS_FOR_DATE_ERROR:
      return {
        ...state,
        loadingPomodorosForDay: false
      }
  }
  return state
}
