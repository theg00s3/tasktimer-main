export const CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION'
export const CREATE_SUBSCRIPTION_SUCCESS = 'CREATE_SUBSCRIPTION_SUCCESS'
export const CREATE_SUBSCRIPTION_FAILURE = 'CREATE_SUBSCRIPTION_FAILURE'

export function createSubscription (token) {
  return (dispatch, getState) => {
    dispatch({type: CREATE_SUBSCRIPTION, payload: null})

    const body = JSON.stringify({email: token.email, token: token.id})
    const url = /pomodoro/.test(location.href)
      ? 'https://api.pomodoro.cc/create-subscription'
      : 'http://localhost:3000/create-subscription'

    window.fetch(url, {
      method: 'POST',
      body,
      mode: 'cors',
      cache: 'no-cache',
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
        return dispatch({type: CREATE_SUBSCRIPTION_FAILURE, payload: data.error})
      }
      return dispatch({type: CREATE_SUBSCRIPTION_SUCCESS, payload: data})
    })
    .catch(err => {
      return dispatch({type: CREATE_SUBSCRIPTION_FAILURE, payload: 'Something went wrong. Please try again later'})
    })
  }
}
