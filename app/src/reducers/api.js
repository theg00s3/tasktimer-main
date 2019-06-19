import { API_GET_POMODOROS_FOR_DATE_SUCCESS, API_GET_POMODOROS_FOR_DATE_ERROR, API_GET_TODOS_FOR_DAY_SUCCESS, API_GET_TODOS_FOR_DAY_ERROR, UPDATE_TODO_SUCCESS, UPDATE_TODO_ERROR } from '../actions'

export const defaultState = {
  pomodorosForDate: {
    date: undefined,
    pomodoros: []
  },
  todosForDate: {
    date: undefined,
    todos: []
  },
  todos: []
}

export default function user (state = defaultState, action) {
  switch (action.type) {
    case API_GET_POMODOROS_FOR_DATE_SUCCESS:
      return Object.assign({}, state, {
        pomodorosForDate: {
          date: action.payload.date,
          pomodoros: action.payload.pomodoros
        }
      })
    case API_GET_POMODOROS_FOR_DATE_ERROR:
      return Object.assign({}, state, {
        pomodorosForDate: defaultState.pomodorosForDate
      })
    case API_GET_TODOS_FOR_DAY_SUCCESS:
      return Object.assign({}, state, {
        todosForDate: {
          date: action.payload.date,
          todos: action.payload.todos
        }
      })
    case API_GET_TODOS_FOR_DAY_ERROR:
      return Object.assign({}, state, {
        todosForDate: defaultState.todosForDate
      })
    case UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        todos: state.todos.map(t => {
          if (t !== action.payload.todo._id) return t
          return action.payload.todo
        })
      })
    case UPDATE_TODO_ERROR:
      return state
    default:
      return state
  }
}
