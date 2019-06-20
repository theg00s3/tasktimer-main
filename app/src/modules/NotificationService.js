export default {
  show,
  requestPermission: window.Notification && window.Notification.requestPermission,
  isSupported: window.Notification && window.Notification.isSupported,
  needsPermission: window.Notification && window.Notification.needsPermission
}

function show (title, options) {
  return new window.Notification(title, {
    timeout: 3,
    ...options
  })
}
