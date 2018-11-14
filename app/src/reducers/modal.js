import {SHOW_MODAL, HIDE_MODAL} from '../actions/modal'

const initialState = {
  show: false,
  shown: []
}

export default function modal (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      const shown = state.shown
        .filter(s => s.name === action.payload)
        .concat({name: action.payload, createdAt: new Date()})

      return {
        show: action.payload,
        shown
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
