import { PAIR_EVENT_SUCCESS } from '../actions'

export const defaultState = null

export default function user (state = defaultState, action) {
  switch (action.type) {
    case PAIR_EVENT_SUCCESS:
      return action.payload
    default:
      return state
  }
}
