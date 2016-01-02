import timer from './reducers/timer'
import todos from './reducers/todos'
import pomodoro from './reducers/pomodoro'
import settings from './reducers/settings'
import loading from './reducers/loading'
import user from './reducers/user'
import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import persistState from 'redux-localstorage'

const store = (function() {
  const storeWithMiddleware = applyMiddleware(thunk)(createStore)
  const storeWithPersistence = compose(
    persistState(['pomodoro','settings','todos'])
  )(storeWithMiddleware)

  const reducer = combineReducers({
    timer,
    todos,
    pomodoro,
    settings,
    loading,
    user,
  })

  return storeWithPersistence(reducer)
})()


export default store
