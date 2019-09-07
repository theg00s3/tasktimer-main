import React, { Component } from 'react'
import './SoundSettings.styl'

export default class SoundSettings extends Component {
  render () {
    const { actions, settings, darkMode } = this.props
    const { tickSoundEnabled, ringSoundEnabled } = settings
    return <div className='sound-settings'>
      <button onClick={() => actions.toggleTickSound()} className='ticking-sound-toggle'>
        {darkMode && !darkMode.enabled && <i className={'vam icon volume ' + (tickSoundEnabled ? '' : 'disabled')} />}
        &nbsp;
        <small style='font-size: 0.8rem'>ticking {tickSoundEnabled ? 'on' : 'off'}</small>
      </button>
      <button onClick={() => actions.toggleRingSound()} className='ringing-sound-toggle'>
        {darkMode && !darkMode.enabled && <i className={'vam icon alarm ' + (ringSoundEnabled ? '' : 'disabled')} />}
        &nbsp;
        <small style='font-size: 0.8rem'>ringing {ringSoundEnabled ? 'on' : 'off'}</small>
      </button>
    </div>
  }
}
