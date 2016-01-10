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
const storeWithMiddleware = applyMiddleware(...middleware)(createStore)
const storeWithPersistence = compose(
  persistState(['pomodoro','settings','todos'])
)(storeWithMiddleware)

const reducer = combineReducers({
  timer,
  todos,
  api,
  pomodoro,
  settings,
  loading,
  user,
  undo,
})

const store = storeWithPersistence(reducer)
export default store
