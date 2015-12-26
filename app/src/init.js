require('nprogress/nprogress.css')
import Timer       from './modules/Timer'
import Sounds      from './modules/Sounds'
import reduxStore  from './reduxStore'
import {tickTimer, resumeTimer, endTimer, authenticateUser} from './actions'

export default function init() {
  const pomodoro = reduxStore.getState().pomodoro
  reduxStore.dispatch(resumeTimer(pomodoro))
  reduxStore.dispatch(authenticateUser())

  Timer.on('tick', (remaining, total) => {
    const state = reduxStore.getState()
    if( state.settings.tickSoundEnabled ){
      Sounds.startTickingSound()
    }
    reduxStore.dispatch(tickTimer(remaining))
  })

  Timer.on('forceEnd', playTimerEndSound)
  Timer.on('end', () => {
    reduxStore.dispatch(endTimer())
    playTimerEndSound()
  })

  function playTimerEndSound() {
    const state = reduxStore.getState()
    Sounds.stopTickingSound()
    if( state.settings.ringSoundEnabled ){
      Sounds.startRingingSound()
    }
  }
}
