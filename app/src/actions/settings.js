/*@flow*/
import AnalyticsService from '../modules/AnalyticsService'
import Sounds from '../modules/Sounds'

export const TOGGLE_TICK_SOUND = 'TOGGLE_TICK_SOUND'
export const TOGGLE_RING_SOUND = 'TOGGLE_RING_SOUND'
export const NOTIFICATION_PERMISSION_GRANT = 'NOTIFICATION_PERMISSION_GRANT'
export const ACKNLOWEDGED_WELCOME = 'ACKNLOWEDGED_WELCOME'

export function toggleTickSound():Action {
  AnalyticsService.track('toggle-tick-sound')
  Sounds.toggleTickSound()
  return {type:TOGGLE_TICK_SOUND, payload:{}}
}

export function toggleRingSound():Action {
  AnalyticsService.track('toggle-ring-sound')
  Sounds.toggleRingSound()
  return {type:TOGGLE_RING_SOUND, payload:{}}
}

export function grantNotificationPermission(grant:boolean):Action {
  AnalyticsService.track('grant-notification-permission')
  return {type:NOTIFICATION_PERMISSION_GRANT, payload:{grant}}
}

export function acknowledgeWelcome():Action {
  AnalyticsService.track('acknowledge-welcome')
  return {type:ACKNLOWEDGED_WELCOME, payload:{}}
}
