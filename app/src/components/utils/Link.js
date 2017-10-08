import React, {Component} from 'react'

export default class Link extends Component {
  render () {
    const url = this.props.to || this.props.href || this.props.url
    return <span onClick={handleRoute} class='link'>{this.props.children}</span>

    function handleRoute (event) {
      const popStateEvent = new window.PopStateEvent('popstate', {url})
      popStateEvent.url = url
      window.history.pushState({url}, null, url)
      window.dispatchEvent(popStateEvent)
    }
  }
}
