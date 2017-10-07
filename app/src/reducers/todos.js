/*     */
import {
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  GET_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  SWAP_TODO_LOCAL
} from '../actions/todos'

import {compose, concat, curry, filter, map, not, propEq} from 'ramda'

export default function todos (state = [], action) {
  switch (action.type) {
    case GET_TODO_SUCCESS: {
      state = action.payload.todos
      break
    }
    case ADD_TODO_SUCCESS: {
      state = addTodo(action.payload)(state)
      break
    }
    case DELETE_TODO_SUCCESS: {
      state = filterTodo(action.payload.todo)(state)
      break
    }
    case UPDATE_TODO_SUCCESS: {
      state = updateTodo(action.payload.todo)(state)
      break
    }
    case SWAP_TODO_LOCAL: {
      const {todo1, todo2} = action.payload
      state = swapTodos(todo1, todo2)(state)
      break
    }
  }
  if (/TODO/.test(action.type)) {
    return orderAndSanitize(state)
  }
  return state
}

const addTodo = (todo) => {
  return (todos) => [...todos, todo]
}

const swapTodos = (todo1, todo2) => {
  return map((todo) => {
    if (!todo1 || !todo2) { return todo }
    if (todo.id === todo1.id) { return todo2 }
    if (todo.id === todo2.id) { return todo1 }
    return todo
  })
}

const filterTodo = (todo) => {
  return filter(compose(
    not,
    propEq('id', todo.id)
  ))
}

const updateTodo = (updatedTodo) => {
  return map((todo) => {
    return (todo.id === updatedTodo.id)
            ? updatedTodo
            : todo
  })
}

const maxOfProp = (prop) => {
  return (acc, curr) => {
    if (notDefined(curr[prop])) {
      return acc
    }
    return (acc > curr[prop]) ? acc : curr[prop] + 1
  }
}
const maxId = maxOfProp('id')
const maxOrder = maxOfProp('order')

const orderAndSanitize = (todos) => {
  return todos
    .map(sanitize)
    .sort(sortByOrder)
}

const sanitize = (todo, index, todos) => {
  if (notDefined(todo.order)) {
    todo.order = todos.reduce(maxOrder, 0)
  }
  if (notDefined(todo.id)) {
    todo.id = todos.reduce(maxId, 0)
  }
  return todo
}

const sortByOrder = (todo1, todo2) => {
  return todo1.order >= todo2.order
}

const notDefined = (x) => (x === undefined || x === null)
