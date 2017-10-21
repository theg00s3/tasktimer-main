import {LOAD_USER_SUCCESS, LOGOUT_USER, LOAD_USER_ERROR, LOGOUT_USER_ERROR} from '../actions'

export const defaultState = null

export default function user (state = defaultState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return action.payload
    case LOAD_USER_ERROR:
    case LOGOUT_USER:
      return defaultState
    case LOGOUT_USER_ERROR:
      return defaultState
    default: {
      return state
    }
  }
}
