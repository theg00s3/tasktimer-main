import React, { Component } from 'react'
import Layout from './Layout'
import Main from './routes/Main'
import Open from './routes/Open'
import Support from './routes/Support'
import FouroFour from './routes/FouroFour'
import About from './routes/About'
import Login from './routes/Login'
import Logout from './routes/Logout'
import Export from './routes/Export'
import ChoosePair from './routes/ChoosePair'
import Pair from './routes/Pair'
import Statistics from './routes/Statistics'

export default class Root extends Component {
  constructor () {
    super()
    this.state = {current: <Main />}
    window.addEventListener('popstate', (event) => {
      const url = event.url || window.location.pathname
      if (url === '/') return this.setState({current: <Main />})
      if (url === '/about') return this.setState({current: <About />})
      if (url === '/open') return this.setState({current: <Open />})
      if (url === '/support') return this.setState({current: <Support />})
      if (url === '/login') return this.setState({current: <Login />})
      if (url === '/logout') return this.setState({current: <Logout />})
      if (url === '/export') return this.setState({current: <Export />})
      if (url === '/pair') return this.setState({current: <ChoosePair />})
      if (url.includes('/pair')) return this.setState({current: <Pair />})
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
