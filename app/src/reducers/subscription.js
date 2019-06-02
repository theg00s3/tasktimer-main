import {CREATE_SUBSCRIPTION, CREATE_SUBSCRIPTION_FAILURE, CREATE_SUBSCRIPTION_SUCCESS} from '../actions'

export const defaultState = {
  errorMessage: '',
  successMessage: ''
}

export default function subscription (state = defaultState, action) {
  switch (action.type) {
    case CREATE_SUBSCRIPTION : {
      return defaultState
    }
    case CREATE_SUBSCRIPTION_FAILURE : {
      return {
        ...state,
        errorMessage: action.payload
      }
    }
    case CREATE_SUBSCRIPTION_SUCCESS : {
      return {
        ...state,
        successMessage: action.payload
      }
    }
  }
  return state
}
