import React, {Component} from 'react'
import './SoundSettings.styl'

export default class SoundSettings extends Component {
  render () {
    const {actions, settings} = this.props
    const {tickSoundEnabled, ringSoundEnabled} = settings
    return <div className='sound-settings'>
      <button onClick={() => actions.toggleTickSound()} className='ticking-sound-toggle'>
        <i className={'icon volume ' + (tickSoundEnabled ? '' : 'disabled')} />
      </button>
      <button onClick={() => actions.toggleRingSound()} className='ringing-sound-toggle'>
        <i className={'icon alarm ' + (ringSoundEnabled ? '' : 'disabled')} />
      </button>
    </div>
  }
}
