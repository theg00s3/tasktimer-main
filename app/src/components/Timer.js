import React, {Component} from 'react'
import './Timer.styl'

export default class Timer extends Component {
  constructor () {
    super()
    this.editingMinutes = false
    this.editingSeconds = false
  }
  editMinutes () {
    const {timer} = this.props
    console.log('editMinutes', timer)
    this.setState({
      editingMinutes: !this.state.editingMinutes
    })
  }
  editSeconds () {
    console.log('editSeconds')
    this.setState({
      editingSeconds: !this.state.editingSeconds
    })
  }
  submitMinutes (event) {
    const { actions } = this.props
    console.log('actions', actions)

    if (event.keyCode !== 13) return
    console.log('submitMinutes', event)
    const minutes = parseInt(event.target.value)
    console.log('minutes', minutes)
    actions.startStopTimer(minutes, 'custom')
    this.setState({
      editingMinutes: false
    })
  }
  render () {
    const {timer} = this.props
    console.log('timer', timer)
    const [_, minutes, seconds] = timer.match(/(\d+):(\d+)/)

    console.log('minutes, seconds', minutes, seconds)
    const editing = this.state.editingMinutes
    return <div id='timer' className='timer'>
      {!editing && <span onDblClick={this.editMinutes.bind(this)} className='minutes'>{minutes}</span>}
      {editing && <input autoFocus type='number' value={minutes} onKeyDown={this.submitMinutes.bind(this)} onDblClick={this.editMinutes.bind(this)} className='minutes'>{minutes}</input>}
      :
      {<span onDblClick={this.editSeconds.bind(this)} className='seconds'>{seconds}</span>}
      {/* {this.state.editingSeconds && <input autoFocus value={seconds} onDblClick={this.editSeconds.bind(this)} className='seconds'>{seconds}</input>} */}
    </div>
  }
}
