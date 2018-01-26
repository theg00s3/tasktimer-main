import {TOGGLE_TICK_SOUND, TOGGLE_RING_SOUND, NOTIFICATION_PERMISSION_GRANT, ACKNLOWEDGED_WELCOME, SUBSCRIBED_TO_FRITTATA} from '../actions'

export const defaultState = {
  tickSoundEnabled: true,
  ringSoundEnabled: true,
  notificationPermissionGranted: false,
  acknlowedgedWelcome: false,
  acknowledgeSignupForm: false,
  subscribedToFrittata: false
}

export default function settings (state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_TICK_SOUND : {
      return {
        ...state,
        tickSoundEnabled: !state.tickSoundEnabled
      }
    }
    case TOGGLE_RING_SOUND : {
      return {
        ...state,
        ringSoundEnabled: !state.ringSoundEnabled
      }
    }
    case NOTIFICATION_PERMISSION_GRANT : {
      return {
        ...state,
        notificationPermissionGranted: !!action.payload.grant
      }
    }
    case ACKNLOWEDGED_WELCOME : {
      return {
        ...state,
        acknlowedgedWelcome: true
      }
    }
    case SUBSCRIBED_TO_FRITTATA : {
      return {
        ...state,
        subscribedToFrittata: true
      }
    }
  }
  return state
}
