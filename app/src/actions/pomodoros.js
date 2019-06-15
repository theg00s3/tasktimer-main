import AnalyticsService from '../modules/AnalyticsService'
import {createPomodoro} from '.'
// export const RECREATE_POMODORO = 'RECREATE_POMODORO'

export function recreatePomodoro (pomodoro, type = 'UPDATE') {
  AnalyticsService.track('recreate-pomodoro', pomodoro)
  return createPomodoro(pomodoro)
}
