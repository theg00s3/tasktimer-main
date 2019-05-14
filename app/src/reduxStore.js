import timer from './reducers/timer'
import todos from './reducers/todos'
import pomodoro from './reducers/pomodoro'
import pomodoros from './reducers/pomodoros'
import settings from './reducers/settings'
import user from './reducers/user'
import pair from './reducers/pair'
import distractions from './reducers/distractions'
import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import persistState from 'redux-localstorage'

const middleware = [thunk]
if (window.development) {
  middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers({
  timer,
  todos,
  pomodoro,
  pomodoros,
  settings,
  user,
  pair,
  distractions
}), composeEnhancers(
  applyMiddleware(...middleware),
  persistState(['settings', 'todos', 'pomodoro', 'pomodoros', 'distractions'])
))

export default store
