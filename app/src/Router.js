import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Layout from './Layout'
import Index from './routes/Index'
import Support from './routes/Support'
import FouroFour from './routes/FouroFour'

export default class Root extends Component {
  render () {
    return <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Index} />
        <Route path='support' component={Support} />
        <Route path='/**' component={FouroFour} />
      </Route>
    </Router>
  }
}
