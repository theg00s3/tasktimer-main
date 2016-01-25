/*@flow*/
import {filter, propEq} from 'ramda'
import {parallel} from 'async'
import AnalyticsService from '../modules/AnalyticsService'
import NotificationCenter from '../modules/NotificationCenter'
import TodosService from '../modules/TodosService'
import {isLoggedIn} from '../modules/Utils'
import {getTodaysCompletedTodos} from './'

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR'
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR'
export const GET_TODO_REQUEST = 'GET_TODO_REQUEST'
export const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS'
export const GET_TODO_ERROR = 'GET_TODO_ERROR'
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR'
export const SWAP_TODO_REQUEST = 'SWAP_TODO_REQUEST'
export const SWAP_TODO_SUCCESS = 'SWAP_TODO_SUCCESS'
export const SWAP_TODO_ERROR = 'SWAP_TODO_ERROR'
export const SWAP_TODO_LOCAL = 'SWAP_TODO_LOCAL'

export function getTodo() {
  return (dispatch, getState) => {
    dispatch({type:GET_TODO_REQUEST, payload:{}})
    TodosService.all()
    .then((response) => {
      const todos = response.data
      dispatch({type:GET_TODO_SUCCESS, payload:{todos}})
    })
    .catch((error) => {
      dispatch({type:GET_TODO_ERROR, payload:{error}})
    })
  }
}

export function swapTodo(todo1, todo2) {
  const tmpTodo1Order = todo1.order
  todo1.order = todo2.order
  todo2.order = tmpTodo1Order
  return (dispatch, getState) => {
    const {user} = getState()
    if( !isLoggedIn(user) ){
      return dispatch({type:SWAP_TODO_LOCAL, payload:{todo1,todo2}})
    }

    dispatch({type:SWAP_TODO_REQUEST, payload:{}})
    parallel([
      (cb) => {
        TodosService.update(todo1.id, todo1)
        .then((r) => cb(null, r))
        .catch((r) => cb(r))
      },
      (cb) => {
        TodosService.update(todo2.id, todo2)
        .then((r) => cb(null, r))
        .catch((r) => cb(r))
      },
    ], (err, responses) => {
      dispatch(getTodo())
    })
  }
}

export function addTodo(todo:Todo):Action{
  AnalyticsService.track('add-todo', todo)
  return (dispatch, getState) => {
    const {user} = getState()
    if( !isLoggedIn(user) ){
      return dispatch({type:ADD_TODO_SUCCESS,payload:todo})
    }

    dispatch({type:ADD_TODO_REQUEST,payload:{}})
    TodosService.create(todo)
    .then(() => dispatch(getTodo()))
    .catch(() => {
      dispatch({type:ADD_TODO_ERROR,payload:{}})
    })
  }
}

export function deleteTodo(todo:Todo):Action {
  AnalyticsService.track('delete-todo', todo)
  return updateTodo({
    ...todo,
    deleted: true
  },'DELETE')
}

export function toggleCompleteTodo(todo:Todo):Action {
  return updateTodo({
    ...todo,
    completed: !todo.completed
  })
}

export function updateTodo(todo:Todo, type='UPDATE':string):Action {
  AnalyticsService.track('update-todo', todo)
  return (dispatch, getState) => {
    NotificationCenter.emit('updateTodo')
    const {user, todos} = getState()
    const [oldTodo] = filterTodo(todo)(todos)
    if( !isLoggedIn(user) ){
      return dispatch({type:`${type}_TODO_SUCCESS`,payload:{todo, oldTodo}})
    }

    dispatch({type:`${type}_TODO_REQUEST`,payload:{}})
    TodosService.update(todo.id, todo)
    .then(() => {
      dispatch({type:`${type}_TODO_SUCCESS`,payload:{todo, oldTodo}})
      dispatch(getTodo())
      dispatch(getTodaysCompletedTodos())
    })
    .catch(() => {
      dispatch({type:`${type}_TODO_ERROR`,payload:{}})
    })
  }
}

function filterTodo(todo){
  return filter(propEq('id', todo.id))
}
