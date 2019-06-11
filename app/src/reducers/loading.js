import {LOAD_USER_REQUEST, LOAD_USER_ERROR, LOAD_USER_SUCCESS} from '../actions'

export const defaultState = {
  loadingUser: false
}

export default function loading (state = defaultState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        loadingUser: true
      }
    case LOAD_USER_SUCCESS:
    case LOAD_USER_ERROR:
      return {
        loadingUser: false
      }
  }
  return state
}
