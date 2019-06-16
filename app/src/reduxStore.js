import api from './reducers/api'
import timer from './reducers/timer'
import todos from './reducers/todos'
import pomodoro from './reducers/pomodoro'
import pomodoros from './reducers/pomodoros'
import settings from './reducers/settings'
import subscription from './reducers/subscription'
import darkMode from './reducers/dark-mode'
import user from './reducers/user'
import team from './reducers/team'
import loading from './reducers/loading'
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
  api,
  timer,
  todos,
  pomodoro,
  pomodoros,
  settings,
  user,
  team,
  loading,
  subscription,
  darkMode
}), composeEnhancers(
  applyMiddleware(...middleware),
  persistState(['settings', 'todos', 'pomodoro', 'pomodoros', 'darkMode'])
))

export default store
