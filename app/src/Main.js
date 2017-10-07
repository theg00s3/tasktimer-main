import React, {Component} from 'react'
import Router from './Router'
import { Provider } from 'react-redux'
import reduxStore from './reduxStore'
export default class Main extends Component {
  render () {
    return <Provider store={reduxStore}>
      <Router />
    </Provider>
  }
}
