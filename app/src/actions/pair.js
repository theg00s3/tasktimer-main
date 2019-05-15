export const PAIR_EVENT = 'PAIR_EVENT'
export const PAIR_EVENT_SUCCESS = 'PAIR_EVENT_SUCCESS'
export const PAIR_EVENT_FAILURE = 'PAIR_EVENT_FAILURE'
export const PAIR_STATUS = 'PAIR_STATUS'
export const PAIR_STATUS_SUCCESS = 'PAIR_STATUS_SUCCESS'
export const PAIR_STATUS_FAILURE = 'PAIR_STATUS_FAILURE'

export function getPairStatus (channel) {
  return (dispatch, getState) => {
    dispatch({type: PAIR_STATUS, payload: null})
    const url = (window.development)
      ? `http://localhost:3000/pair/${channel}`
      : `https://api.pomodoro.cc/pair/${channel}`

    window.fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        return dispatch({type: PAIR_STATUS_SUCCESS, payload: null})
      })
      .catch(err => {
        return dispatch({type: PAIR_STATUS_FAILURE, payload: err})
      })
  }
}

export function sendPairRequest (channel, data = {minutes: 25, type: 'pomodoro'}) {
  return (dispatch, getState) => {
    dispatch({type: PAIR_EVENT, payload: null})
    const url = (window.development)
      ? `http://localhost:3000/pair/${channel}`
      : `https://api.pomodoro.cc/pair/${channel}`

    const body = JSON.stringify(data)

    window.fetch(url, {
      method: 'POST',
      mode: 'cors',
      body,
      cache: 'no-cache'
    })
      .then(res => res.json())
      .then(() => {
        return dispatch({type: PAIR_EVENT_SUCCESS, payload: data})
      })
      .catch(err => {
        return dispatch({type: PAIR_EVENT_FAILURE, payload: err})
      })
  }
}
