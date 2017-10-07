export default {
  track: registerEvent('track'),
  identify: registerEvent('identify'),
  page: registerEvent('page')
}

function registerEvent (eventName) {
  return function (...args) {
    if (window.analytics && window.analytics[eventName] && window.analytics[eventName] instanceof Function) {
      window.analytics[eventName](...args)
    }
  }
}
