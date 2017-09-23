import {h, render, Component} from 'preact'
import Router from './Router'
import { Provider } from 'preact-redux'
import reduxStore from './reduxStore'

export default class Main extends Component {
  render () {
    debugger
    return <Provider store={reduxStore}>
      <Router />
    </Provider>
  }
}
