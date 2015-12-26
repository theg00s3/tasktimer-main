require('./SoundSettings.styl')
import React, {Component, PropTypes} from 'react'

export default class SoundSettings extends Component {
  render() {
    const {actions, settings} = this.props
    const {tickSoundEnabled, ringSoundEnabled} = settings
    return  <div className="sound-settings">
              <button onClick={()=>actions.toggleTickSound()} className="ticking-sound-toggle">
                <i className={'icon ' + (tickSoundEnabled ? 'ion-ios-volume-high': 'ion-ios-volume-low')}/>
              </button>
              <button onClick={()=>actions.toggleRingSound()} className="ringing-sound-toggle">
                <i className={'icon ' + (ringSoundEnabled ? 'ion-ios-bell':'ion-ios-bell-outline')}/>
              </button>
              {/*
              <div>tick enabled: {settings.tickSoundEnabled ? 'true' : 'false'}</div>
              <div>ring enabled: {settings.ringSoundEnabled ? 'true' : 'false'}</div>
              <button onClick={()=>actions.toggleTickSound()}>tick</button>
              <button onClick={()=>actions.toggleRingSound()}>ring</button>
              */}
            </div>
  }
}
SoundSettings.propTypes = {
  actions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}
