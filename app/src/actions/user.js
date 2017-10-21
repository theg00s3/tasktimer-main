import 'whatwg-fetch'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'

export function loadUser () {
  return (dispatch, getState) => {
    dispatch({type: LOAD_USER_REQUEST})
    window.fetch('https://auth.pomodoro.cc/info', {credentials: 'include'})
      .then(r => r.json())
      .then(json => dispatch({type: LOAD_USER_SUCCESS, payload: json}))
      .catch((err) => dispatch({type: LOAD_USER_ERROR, payload: err}))
  }
}
