/*     */
import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  authenticateUser
} from '../actions'

let initialState = {}

if (true && window.development) {
  initialState = {
    __v: 0,
    _id: '56311e508a0a76010090366f',
    apikey: '4p1k3y',
    avatar: 'https://avatars.githubusercontent.com/u/2662706?v=3',
    id: 2662706,
    username: 'christian-fei'
  }
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER_REQUEST: {
      return initialState
    }
    case AUTHENTICATE_USER_SUCCESS: {
      return action.payload.user
    }
    case AUTHENTICATE_USER_FAILURE: {
      return initialState
    }
  }
  return state
}
