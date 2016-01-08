/*@flow*/
import {
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  GET_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS
} from '../actions/todos'

import _ from 'underscore'
import {compose, concat, curry, filter, not, propEq} from 'ramda'

export default function todos(state:TodoState=[], action:Action):TodoState {
  switch(action.type){
  case GET_TODO_SUCCESS: {
    return action.payload.todos
  }
  case ADD_TODO_SUCCESS: {
    let newTodo = action.payload
    if( !newTodo.id ){
      newTodo.id = state.reduce(max, 0)
    }
    return sortCompleted([
      ...state,
      newTodo
    ])
  }
  case DELETE_TODO_SUCCESS: {
    return sortCompleted(state.filter((todo) => {
      const updatedTodo = action.payload.todo
      return todo.id !== updatedTodo.id
    }))
  }
  case UPDATE_TODO_SUCCESS: {
    const updatedTodo = action.payload.todo
    state = state.map((todo) => {
      return (todo.id === updatedTodo.id)
              ? updatedTodo
              : todo
    })

    state =  upsert(updatedTodo)(state)
    return sortCompleted(state)
  }
  }
  return sortCompleted(state)
}

const max = (acc, curr) => (acc > curr.id ? acc : curr.id+1)

const sortCompleted = (todos) => {
  return todos
  .sort((t1, t2) => {
    return t1.completed >= t2.completed
  })
  .sort((t1,t2) => {
    if( t1.completed !== t2.completed ) {
      return 0
    }
    return t1.id > t2.id
  })
}

const upsert = curry((todo, todos) => {
  const listWithoutTodo = filter(compose(
    not,
    propEq('id', todo.id)
  ))(todos)

  return concat(listWithoutTodo, [todo])
})
