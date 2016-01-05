require('nprogress/nprogress.css')
import Timer       from './modules/Timer'
import Sounds      from './modules/Sounds'
import {getState, dispatch}  from './reduxStore'
import {tickTimer, resumeTimer, endTimer, authenticateUser, getTodaysPomodori} from './actions'

export default function init() {
  const pomodoro = getState().pomodoro
  dispatch(resumeTimer(pomodoro))
  dispatch(authenticateUser())
  dispatch(getTodaysPomodori())

  Timer.on('tick', (remaining, total) => {
    const state = getState()
    if( state.settings.tickSoundEnabled ){
      Sounds.startTickingSound()
    }
    dispatch(tickTimer(remaining))
  })

  Timer.on('forceEnd', playTimerEndSound)
  Timer.on('end', () => {
    dispatch(endTimer())
    dispatch(getTodaysPomodori())
    playTimerEndSound()
  })

  function playTimerEndSound() {
    const state = getState()
    Sounds.stopTickingSound()
    if( state.settings.ringSoundEnabled ){
      Sounds.startRingingSound()
    }
  }
}
