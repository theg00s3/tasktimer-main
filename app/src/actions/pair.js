export const PAIR_EVENT = 'PAIR_EVENT'
export const PAIR_EVENT_SUCCESS = 'PAIR_EVENT_SUCCESS'
export const PAIR_EVENT_FAILURE = 'PAIR_EVENT_FAILURE'

export function startStopPairTimer (channel, data = {minutes: 25, type: 'pomodoro'}) {
  return (dispatch, getState) => {
    dispatch({type: PAIR_EVENT, payload: null})
    const url = (window.development)
      ? `http://localhost:3000/pair/${channel}`
      : `https://api.pomodoro.cc/pair/${channel}`

    const body = JSON.stringify(data)
    console.log('body', body)

    window.fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: body,
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
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
