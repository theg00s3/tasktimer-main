var React = require('react')

var SoundService = require('../modules/SoundService')

var enabledSoundClass = 'icon ion-ios-volume-high'
var disabledSoundClass = 'icon ion-ios-volume-low'

module.exports = React.createClass({
  getInitialState: function(){
    return {
      tickingButtonClass: disabledSoundClass,
      ringingButtonClass: disabledSoundClass,
    }
  },
  componentWillMount: function(){
    this._updateState()
  },
  _updateState: function(){
    var tickingButtonClass = SoundService.isMutedTickingSound() ? disabledSoundClass : enabledSoundClass
    var ringingButtonClass = SoundService.isMutedRingingSound() ? disabledSoundClass : enabledSoundClass
    this.setState({
      tickingButtonClass: tickingButtonClass,
      ringingButtonClass: ringingButtonClass,
    })
  },
  _toggleTicking: function(){
    SoundService.toggleMuteTickingSound()
    this._updateState()
  },
  _toggleRinging: function(){
    SoundService.toggleMuteRingingSound()
    this._updateState()
  },
  render: function(){
    return  <div className="sound-settings-buttons-container">
              <button onClick={this._toggleTicking}>
                <i className={this.state.tickingButtonClass}></i>
                <span>ticking</span>
              </button>
              <button onClick={this._toggleRinging}>
                <i className={this.state.ringingButtonClass}></i>
                <span>ringing</span>
              </button>
            </div>
  },
})
