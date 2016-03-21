require('./SoundSettings.styl')
import React, {Component, PropTypes} from 'react'

export default class SoundSettings extends Component {
  render() {
    const {actions, settings} = this.props
    const {tickSoundEnabled, ringSoundEnabled} = settings
    return  <div className="sound-settings">
              <button onClick={()=>actions.toggleTickSound()} className="ticking-sound-toggle">
                <i className={'icon volume ' + (tickSoundEnabled ? '': 'disabled')}/>
              </button>
              <button onClick={()=>actions.toggleRingSound()} className="ringing-sound-toggle">
                <i className={'icon alarm ' + (ringSoundEnabled ? '': 'disabled')}/>
              </button>
            </div>
  }
}
SoundSettings.propTypes = {
  actions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}
