import {h, Component} from 'preact'
import Router from './Router'
import { Provider } from 'react-redux'
import reduxStore from './reduxStore'
export default class Main extends Component {
  render () {
    return <Provider store={reduxStore}>
      <Router />
    </Provider>
  }
}
