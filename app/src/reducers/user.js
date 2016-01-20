/*@flow*/
import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  authenticateUser
} from '../actions'

let initialState = {}

if(false && window.development ){
  initialState = {
    __v: 0,
    _id: "56311e508a0a76010090366f",
    apikey: "something secret, you fool",
    avatar: "https://avatars.githubusercontent.com/u/2662706?v=3",
    id: 2662706,
    username: "christian-fei",
  }
}

export default function user(state:UserState=initialState, action:Action):UserState {
  switch(action.type){
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
