import 'whatwg-fetch'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'

export function loadUser () {
  return (dispatch, getState) => {
    window.fetch('https://auth.pomodoro.cc/info', {credentials: true})
    .then(r => r.body())
    .then(body => {
      console.log('body', body)
      return dispatch({type: LOAD_USER_SUCCESS, payload: body})
    })
    .catch((err) => ({
      type: LOAD_USER_ERROR,
      payload: err
    }))
  }
}
