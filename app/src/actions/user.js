/*     */
import AuthService from '../modules/AuthService'
import AnalyticsService from '../modules/AnalyticsService'
import {getTodo} from './'
export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST'
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS'
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE'

export function authenticateUser () {
  return (dispatch, getState) => {
    dispatch(authenticateUserRequest())
    AuthService.authenticate()
    .then((response) => {
      const user = response.data
      dispatch(authenticateUserSuccess(user))
      AnalyticsService.identify(user.id, {
        name: user.username,
        username: user.username
      })
    })
    .catch((error) => {
      dispatch(authenticateUserFailure(error))
    })
  }
}
export function authenticateUserRequest () {
  return {type: AUTHENTICATE_USER_REQUEST, payload: {}}
}
export function authenticateUserSuccess (user) {
  return {type: AUTHENTICATE_USER_SUCCESS, payload: {user}}
}
export function authenticateUserFailure (error) {
  return {type: AUTHENTICATE_USER_FAILURE, payload: {error}}
}
