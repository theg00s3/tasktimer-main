import {LOAD_USER_SUCCESS} from '../actions'

export const defaultState = {}

export default function user (state = defaultState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return action.payload
    default: {
      return state
    }
  }
}
