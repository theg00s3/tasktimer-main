import Timer from './modules/Timer'
import Sounds from './modules/Sounds'
import reduxStore from './reduxStore'
import {tickTimer, resumeTimer, endTimer, loadUser} from './actions'

const {getState, dispatch} = reduxStore

export default function init () {
  Timer.on('tick', (remaining, total) => {
    const state = getState()
    if (state.settings.tickSoundEnabled) {
      Sounds.startTickingSound()
    }
    dispatch(tickTimer(remaining))
  })

  dispatch(loadUser())
  Timer.on('forceEnd', playTimerEndSound)
  Timer.on('end', () => {
    dispatch(endTimer())
    playTimerEndSound()
  })

  const {pomodoro} = reduxStore.getState()

  if (pomodoro && pomodoro.startedAt) {
    if (+new Date(pomodoro.startedAt) + pomodoro.minutes * 60 < Date.now()) {
      console.log('pomodoro in progress', pomodoro)
      console.log('resume')
      dispatch(resumeTimer(pomodoro))
    } else {
      console.log('pomodoro out of sync', pomodoro)
    }
  } else {
    console.log('no pomodoro in progress')
  }

  function playTimerEndSound () {
    const state = getState()
    Sounds.stopTickingSound()
    if (state.settings.ringSoundEnabled) {
      Sounds.startRingingSound()
    }
  }
}
