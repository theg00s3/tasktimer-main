import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { browserHistory } from 'react-router'
import Layout from './Layout'
import Index from './routes/Index'
import Login from './routes/Login'
import Support from './routes/Support'
import Profile from './routes/Profile'
import Statistics from './routes/Statistics'
import FouroFour from './routes/FouroFour'

export default class Root extends Component {
  render() {
    return  <Router history={browserHistory}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Index}/>
                <Route path='login' component={Login} />
                <Route path='support' component={Support} />
                <Route path='profile' component={Profile} />
                <Route path='statistics' component={Statistics} />
                <Route path='/**' component={FouroFour} />
              </Route>
            </Router>
  }
}
