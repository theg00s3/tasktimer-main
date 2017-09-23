require('./Timer.styl')
import {h, Component} from 'preact'

export default class Timer extends Component {
  render() {
    const {timer} = this.props
    return  <div className="timer">
              {timer}
            </div>
  }
}
