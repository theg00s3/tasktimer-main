import React, { Component } from 'react'
import Layout from './Layout'
import Index from './routes/Index'
import Support from './routes/Support'
import Statistics from './routes/Statistics'
import FouroFour from './routes/FouroFour'

export default class Root extends Component {
  constructor () {
    super()
    this.state = {current: <Index />}
    window.addEventListener('popstate', (event) => {
      const url = event.url || window.location.pathname
      if (url === '/') return this.setState({current: <Index />})
      if (url === '/support') return this.setState({current: <Support />})
      if (url === '/statistics') return this.setState({current: <Statistics />})
      this.setState({current: <FouroFour />})
    })
    const popStateEvent = new window.PopStateEvent('popstate')
    popStateEvent.url = window.location.pathname
    window.dispatchEvent(popStateEvent)
  }

  render () {
    return <Layout>
      {this.state.current}
    </Layout>
  }
}
