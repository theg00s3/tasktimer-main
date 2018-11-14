export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

export function showModal (name) {
  return {type: SHOW_MODAL, payload: name}
}
export function hideModal (name) {
  return {type: HIDE_MODAL, payload: name}
}
