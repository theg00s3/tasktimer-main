import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Layout from './Layout'
import Index from './routes/Index'
import Login from './routes/Login'
import Support from './routes/Support'

export default class Root extends Component {
  render() {
    return  <Router history={createBrowserHistory()}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Index}/>
                <Route path='login' component={Login} />
                <Route path='support' component={Support} />
              </Route>
            </Router>
  }
}
