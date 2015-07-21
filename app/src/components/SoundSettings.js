var React = require('react')

var SoundService = require('../modules/SoundService')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      tickingButtonClass: '',
      ringingButtonClass: '',
    }
  },
  componentWillMount: function(){
    this._updateState()
  },
  _updateState: function(){
    var tickingButtonClass = ringingButtonClass = 'icon '
    tickingButtonClass += SoundService.isMutedTickingSound() ? 'ion-ios-volume-low' : 'ion-ios-volume-high'
    ringingButtonClass += SoundService.isMutedRingingSound() ? 'ion-ios-bell-outline' : 'ion-ios-bell'
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
              <button onClick={this._toggleTicking} className="ticking-sound-toggle">
                <i className={this.state.tickingButtonClass}></i>
              </button>
              <button onClick={this._toggleRinging} className="ringing-sound-toggle">
                <i className={this.state.ringingButtonClass}></i>
              </button>
            </div>
  },
})
