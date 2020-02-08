import React, { Component } from 'react'

export default class Link extends Component {
  render () {
    const url = this.props.to || this.props.href || this.props.url
    const reload = !!this.props.reload
    const onClick = this.props.onClick
    const classNames = `link ${this.props.class} ${this.props.className}`
    const id = `${this.props.id}`

    return <span tabIndex='0' onKeyUp={withEnterKey(handleRoute)} onClick={handleRoute} id={id} className={classNames}>{this.props.children}</span>

    function handleRoute (event) {
      typeof onClick === 'function' && onClick()
      if (reload) {
        window.location.href = url
        return
      }

      const popStateEvent = new window.PopStateEvent('popstate', { url })
      popStateEvent.url = url
      window.history.pushState(null, document.title, url)
      window.dispatchEvent(popStateEvent)
    }

    function withEnterKey (callback) {
      return (event) => (event.keyCode === 13) ? callback(event) : null
    }
  }
}
