import React, {Component} from 'react'
import closeIcon from '../assets/images/close.png'
import './Modal.styl'

export default class Modal extends Component {
  render () {
    const {modal, actions} = this.props

    if (!modal || !modal.show) return null

    console.log('render modal', modal.show)

    if (modal.show === 'poll') {
      return <div className='modal'>
        <div className='modal-body'>
          <div onClick={() => actions.hideModal('poll')} style={{'float': 'right'}} className='icon' tabindex='0'>
            <img src={closeIcon} />
          </div>

          <h1 className='title'><b>Just 30 seconds</b> of your time</h1>
          <h2 className='subtitle'>for feedback about a new Pomodoro.cc feature</h2>
          <div>
            <iframe src='https://docs.google.com/forms/d/e/1FAIpQLSeMGWSCz6kZgbzDTrvz86HBxqWV0rWV1NAzy2ytFI38gknbVw/viewform?embedded=true' width='533' height='926' frameborder='0' marginheight='0' marginwidth='0'>Loading...</iframe>
          </div>

          <br />

          <h2 className='feedback'>Your feedback is important!</h2>
        </div>
      </div>
    }
    return null
  }
}
