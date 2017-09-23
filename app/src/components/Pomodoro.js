import {h, Component} from 'preact'
import Timer from './Timer'
import TimerButtons from './TimerButtons'

export default class Pomodoro extends Component {
  render() {
    const {timer, pomodoro, actions} = this.props
    return  <div>
              <Timer timer={timer}/>
              <TimerButtons pomodoro={pomodoro} actions={actions}/>
            </div>
  }
}
