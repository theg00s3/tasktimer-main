import React, {Component} from 'react'

export default class Link extends Component {
  render () {
    const url = this.props.to || this.props.href || this.props.url
    const classNames = `link ${this.props.class} ${this.props.className}`
    return <span tabindex='0' onKeyUp={withEnterKey(handleRoute)} onClick={handleRoute} class={classNames}>{this.props.children}</span>

    function handleRoute (event) {
      const popStateEvent = new window.PopStateEvent('popstate', {url})
      popStateEvent.url = url
      window.history.pushState({url}, null, url)
      window.dispatchEvent(popStateEvent)
    }

    function withEnterKey (callback) {
      return (event) => (event.keyCode === 13) ? callback(event) : null
    }
  }
}
