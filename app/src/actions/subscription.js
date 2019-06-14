import { LOAD_USER_SUCCESS } from '../actions'
import AnalyticsService from '../modules/AnalyticsService'

export const CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION'
export const CREATE_SUBSCRIPTION_SUCCESS = 'CREATE_SUBSCRIPTION_SUCCESS'
export const CREATE_SUBSCRIPTION_ERROR = 'CREATE_SUBSCRIPTION_ERROR'

export function createSubscription (token) {
  return (dispatch, getState) => {
    dispatch({type: CREATE_SUBSCRIPTION, payload: null})

    const body = JSON.stringify({email: token.email, token: token.id})
    const url = /pomodoro/.test(location.href)
      ? 'https://api.pomodoro.cc/subscriptions'
      : 'http://localhost:3000/subscriptions'

    window.fetch(url, {
      method: 'POST',
      body,
      cache: 'no-cache',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('data', data)
      if (data.error) {
        AnalyticsService.track('create-subscription-error', data.error)
        return dispatch({type: CREATE_SUBSCRIPTION_ERROR, payload: data.error})
      }
      AnalyticsService.track('create-subscription-success', data)
      dispatch({type: CREATE_SUBSCRIPTION_SUCCESS, payload: data})
      dispatch({type: LOAD_USER_SUCCESS, payload: data.user})
    })
    .catch(err => {
      AnalyticsService.track('create-subscription-error', err)
      return dispatch({type: CREATE_SUBSCRIPTION_ERROR, payload: 'Something went wrong. Please try again'})
    })
  }
}
