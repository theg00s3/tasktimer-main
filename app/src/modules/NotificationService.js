import Notify from 'notifyjs'

export default {
  show,
  requestPermission: Notify.requestPermission,
  isSupported: Notify.isSupported,
  needsPermission: Notify.needsPermission
}

function show (title, options) {
  return new Notify(title, {
    timeout: 3,
    ...options
  }).show()
}
