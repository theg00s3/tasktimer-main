import reduxStore from '../reduxStore'
import {showModal, hideModal} from '../actions'
const {dispatch} = reduxStore

export default {
  show,
  hide
}

function show (name) {
  dispatch(showModal(name))
}
function hide (name) {
  dispatch(hideModal(name))
}
