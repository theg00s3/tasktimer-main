import {SHOW_MODAL, HIDE_MODAL} from '../actions/modal'

const initialState = {
  show: false,
  shown: []
}

export default function modal (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      console.log('state', state)
      console.log('state.shown', state.shown)
      const shown = (state.shown || [])
        .filter(s => s && s.name !== action.payload)
        .concat([{name: action.payload, createdAt: new Date()}])

      return Object.assign({}, state, {
        show: action.payload,
        shown
      })
    }
    case HIDE_MODAL: {
      return Object.assign({}, state, {
        show: false
      })
    }
  }
  return state
}
