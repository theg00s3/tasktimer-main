import {SHOW_MODAL, HIDE_MODAL} from '../actions/modal'

export default function modal (state = null, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        show: action.payload
      }
    }
    case HIDE_MODAL: {
      return {
        show: false
      }
    }
  }
  return state
}
