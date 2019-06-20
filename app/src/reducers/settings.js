import {TOGGLE_TICK_SOUND, TOGGLE_RING_SOUND, NOTIFICATION_PERMISSION_GRANT} from '../actions'

export const defaultState = {
  tickSoundEnabled: false,
  ringSoundEnabled: false,
  notificationPermissionGranted: false,
  acknowledgeSignupForm: false
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
  }
  return state
}
