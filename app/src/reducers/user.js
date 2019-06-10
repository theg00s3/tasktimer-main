import {LOAD_USER_SUCCESS, LOGOUT_USER_SUCCESS, LOAD_USER_ERROR, LOGOUT_USER_ERROR} from '../actions'

export const defaultState = null

export default function user (state = defaultState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return action.payload
      // return Object.assign({}, action.payload, { customer: null, subscription: null })
    case LOAD_USER_ERROR:
    case LOGOUT_USER_SUCCESS:
    case LOGOUT_USER_ERROR:
      return defaultState
    default:
      return state
  }
}
