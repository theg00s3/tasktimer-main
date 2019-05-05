import React, {Component} from 'react'
import './TrackDistraction.styl'

export default class TrackDistraction extends Component {
  render () {
    const {actions, distractions} = this.props
    return <div className='track-distraction'>
      <button onClick={() => actions.trackDistraction()} className='track-distraction-button' id='track-distraction-button'>
        {distractions.distractionTrackText}
      </button>
      {/* <pre>{JSON.stringify(distractions)}</pre> */}
      <br />
      <div className='tac'>
        {+distractions.lastTracked > +new Date() - 1000 * 4 ? 'Distraction tracked' : null}
      </div>
    </div>
  }
}
