/*     */
import NProgress from 'nprogress'
import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  GET_TODO_ERROR,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  GET_TODAYS_POMODORI_REQUEST,
  GET_TODAYS_POMODORI_SUCCESS,
  GET_TODAYS_POMODORI_ERROR
} from '../actions'

export const defaultState = false

export default function pomodoro (state = defaultState, action) {
  switch (action.type) {
    case ADD_TODO_REQUEST:
    case DELETE_TODO_REQUEST:
    case GET_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case GET_TODAYS_POMODORI_REQUEST:
      NProgress.start()
      return true
    case ADD_TODO_SUCCESS:
    case ADD_TODO_ERROR:
    case DELETE_TODO_SUCCESS:
    case DELETE_TODO_ERROR:
    case GET_TODO_SUCCESS:
    case GET_TODO_ERROR:
    case UPDATE_TODO_SUCCESS:
    case UPDATE_TODO_ERROR:
    case GET_TODAYS_POMODORI_SUCCESS:
    case GET_TODAYS_POMODORI_ERROR:
      NProgress.done()
      return false
  }
  return state
}
