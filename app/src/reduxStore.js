import timer from './reducers/timer'
import todos from './reducers/todos'
import api from './reducers/api'
import pomodoro from './reducers/pomodoro'
import settings from './reducers/settings'
import loading from './reducers/loading'
import user from './reducers/user'
import undo from './reducers/undo'
import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import persistState from 'redux-localstorage'

const middleware = [thunk]
if( window.development ){
  middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
  timer,
  todos,
  api,
  pomodoro,
  settings,
  loading,
  user,
  undo,
}), composeEnhancers(
  applyMiddleware(...middleware),
  persistState(['settings','todos']),
));

export default store
