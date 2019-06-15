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
    this.setState({
      editingMinutes: !this.state.editingMinutes
    })
  }
  editSeconds () {
    this.setState({
      editingSeconds: !this.state.editingSeconds
    })
  }
  submitMinutes (event) {
    const { actions } = this.props

    if (event.keyCode !== 13) return
    const minutes = parseInt(event.target.value)
    actions.startStopTimer(minutes, 'custom')
    this.setState({
      editingMinutes: false
    })
  }
  render () {
    const {timer} = this.props
    const [_, minutes, seconds] = timer.match(/(\d+):(\d+)/)

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
