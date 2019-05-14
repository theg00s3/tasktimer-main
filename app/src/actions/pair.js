export const PAIR_EVENT = 'PAIR_EVENT'
export const PAIR_EVENT_SUCCESS = 'PAIR_EVENT_SUCCESS'
export const PAIR_EVENT_FAILURE = 'PAIR_EVENT_FAILURE'

export function sendTestEvent (channel, data = {}) {
  return (dispatch, getState) => {
    dispatch({type: PAIR_EVENT, payload: null})
    const url = (window.development) ? `http://localhost:3000/pair/${channel}` : `https://api.pomodoro.cc/pair/${channel}`
    window.fetch(url, {method: 'POST', mode: 'no-cors', body: data})
      .then(() => {
        return dispatch({type: PAIR_EVENT_SUCCESS, payload: data})
      })
      .catch(err => {
        return dispatch({type: PAIR_EVENT_FAILURE, payload: err})
      })
  }
}
