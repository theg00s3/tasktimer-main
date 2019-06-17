import AnalyticsService from '../modules/AnalyticsService'
import {apiCreatePomodoro, apiCreateTodo} from '.'

export function recreatePomodoro (pomodoro) {
  AnalyticsService.track('recreate-pomodoro', pomodoro)
  return apiCreatePomodoro(pomodoro)
}
export function reapiCreateTodo (todo) {
  AnalyticsService.track('recreate-todo', todo)
  return apiCreateTodo(todo)
}
