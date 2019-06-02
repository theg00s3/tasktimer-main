import AnalyticsService from '../modules/AnalyticsService'

export const CREATE_POMODORO = 'CREATE_POMODORO'
export const CREATE_POMODORO_SUCCESS = 'CREATE_POMODORO_SUCCESS'
export const CREATE_POMODORO_FAILURE = 'CREATE_POMODORO_FAILURE'

export function createPomodoro (pomodoro) {
  return (dispatch, getState) => {
    dispatch({type: CREATE_POMODORO, payload: null})

    const body = JSON.stringify(pomodoro)
    const url = /pomodoro/.test(location.href)
      ? 'https://api.pomodoro.cc/api/pomodoro'
      : 'http://localhost:3000/api/pomodoro'

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
        AnalyticsService.track('create-pomodoro-failure', data.error)
        return dispatch({type: CREATE_POMODORO_FAILURE, payload: data.error})
      }
      AnalyticsService.track('create-pomodoro-success', data)
      dispatch({type: CREATE_POMODORO_SUCCESS, payload: data})
    })
    .catch(err => {
      AnalyticsService.track('create-pomodoro-failure', err)
      return dispatch({type: CREATE_POMODORO_FAILURE, payload: 'Something went wrong. Please try again'})
    })
  }
}
