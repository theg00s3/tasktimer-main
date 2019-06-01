export const TEAM_EVENT = 'TEAM_EVENT'
export const TEAM_EVENT_SUCCESS = 'TEAM_EVENT_SUCCESS'
export const TEAM_EVENT_FAILURE = 'TEAM_EVENT_FAILURE'
export const TEAM_STATUS = 'TEAM_STATUS'
export const TEAM_STATUS_SUCCESS = 'TEAM_STATUS_SUCCESS'
export const TEAM_STATUS_FAILURE = 'TEAM_STATUS_FAILURE'

export function sendTeamRequest (channel, data = {minutes: 25, type: 'pomodoro'}) {
  return (dispatch, getState) => {
    dispatch({type: TEAM_EVENT, payload: null})
    const url = (window.development)
      ? `http://localhost:3000/team/${channel}`
      : `https://api.pomodoro.cc/team/${channel}`

    const body = JSON.stringify(data)

    window.fetch(url, {
      method: 'POST',
      body,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        return dispatch({type: TEAM_EVENT_SUCCESS, payload: data})
      })
      .catch(err => {
        return dispatch({type: TEAM_EVENT_FAILURE, payload: err})
      })
  }
}
