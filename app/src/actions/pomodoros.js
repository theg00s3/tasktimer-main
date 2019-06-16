import AnalyticsService from '../modules/AnalyticsService'
import {createPomodoro, createTodo} from '.'

export function recreatePomodoro (pomodoro) {
  AnalyticsService.track('recreate-pomodoro', pomodoro)
  return createPomodoro(pomodoro)
}
export function recreateTodo (todo) {
  AnalyticsService.track('recreate-todo', todo)
  return createTodo(todo)
}
