import {
  CREATE_SUBSCRIPTION, CREATE_SUBSCRIPTION_ERROR, CREATE_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION, CANCEL_SUBSCRIPTION_ERROR, CANCEL_SUBSCRIPTION_SUCCESS
} from '../actions'

export const defaultState = {
  errorMessage: '',
  successMessage: ''
}

export default function subscription (state = defaultState, action) {
  switch (action.type) {
    case CREATE_SUBSCRIPTION : {
      return defaultState
    }
    case CREATE_SUBSCRIPTION_ERROR : {
      return {
        ...state,
        errorMessage: action.payload
      }
    }
    case CREATE_SUBSCRIPTION_SUCCESS : {
      return {
        ...state,
        successMessage: action.payload && action.payload.message
      }
    }
    case CANCEL_SUBSCRIPTION : {
      return defaultState
    }
    case CANCEL_SUBSCRIPTION_ERROR : {
      return {
        ...state,
        errorMessage: action.payload
      }
    }
    case CANCEL_SUBSCRIPTION_SUCCESS : {
      return {
        ...state,
        successMessage: action.payload && action.payload.message
      }
    }
  }
  return state
}
