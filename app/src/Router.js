import React, { Component } from 'react'
import Layout from './Layout'
import Index from './routes/Index'
import Support from './routes/Support'
import FouroFour from './routes/FouroFour'
import Login from './routes/Login'
import Logout from './routes/Logout'
import Export from './routes/Export'

export default class Root extends Component {
  constructor () {
    super()
    this.state = {current: <Index />}
    window.addEventListener('popstate', (event) => {
      const url = event.url || window.location.pathname
      if (url === '/') return this.setState({current: <Index />})
      if (url === '/support') return this.setState({current: <Support />})
      if (url === '/login') return this.setState({current: <Login />})
      if (url === '/logout') return this.setState({current: <Logout />})
      if (url === '/export') return this.setState({current: <Export />})
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
