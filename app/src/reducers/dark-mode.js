export const ENABLE_DARK_MODE = 'ENABLE_DARK_MODE'
export const DISABLE_DARK_MODE = 'DISABLE_DARK_MODE'
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'

export const defaultState = {
  enabled: true
}

export default function darkMode (state = defaultState, action) {
  switch (action.type) {
    case ENABLE_DARK_MODE : {
      return {
        ...state,
        enabled: true
      }
    }
    case DISABLE_DARK_MODE : {
      return {
        ...state,
        enabled: false
      }
    }
    case TOGGLE_DARK_MODE : {
      return {
        ...state,
        enabled: !state.enabled
      }
    }
  }
  return state
}
