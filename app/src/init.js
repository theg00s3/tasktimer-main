import Timer from './modules/Timer'
// import Sounds from './modules/Sounds'
import NotificationService from './modules/NotificationService'
import reduxStore from './reduxStore'
import {tickTimer, resumeTimer, endTimer, loadUser, grantNotificationPermission} from './actions'

const {getState, dispatch} = reduxStore

export default function init () {
  Timer.on('tick', (remaining, total) => {
    const state = getState()
    if (state.settings.tickSoundEnabled) {
      // Sounds.startTickingSound()
    }
    dispatch(tickTimer(remaining))
  })

  const state = getState()

  const shouldShowNotificationGrant = NotificationService.needsPermission && !state.settings.notificationPermissionGranted
  if (shouldShowNotificationGrant) {
    requestNotificationPermission()
  }

  function requestNotificationPermission () {
    NotificationService.requestPermission(() => {
      dispatch(grantNotificationPermission({grant: true}))
    }, () => {
      dispatch(grantNotificationPermission({grant: false}))
    })
  }

  dispatch(loadUser())
  Timer.on('forceEnd', playTimerEndSound)
  Timer.on('end', () => {
    dispatch(endTimer())
    playTimerEndSound()
  })

  const {pomodoro} = state

  if (pomodoro && pomodoro.startedAt) {
    if (+new Date(pomodoro.startedAt) + pomodoro.minutes * 60 < Date.now()) {
      if (!/team/.test(window.location.pathname)) {
        dispatch(resumeTimer(pomodoro))
      }
    }
  }

  function playTimerEndSound () {
    // const state = getState()
    // Sounds.stopTickingSound()
    // if (state.settings.ringSoundEnabled) {
    //   Sounds.startRingingSound()
    // }
  }
}
