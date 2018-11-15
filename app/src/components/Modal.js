import React, {Component} from 'react'
import './Modal.styl'

export default class Modal extends Component {
  render () {
    const {modal} = this.props

    if (!modal.show) return null

    if (modal.show === 'poll') {
      return <div className='modal'>
        <div className='modal-body'>
          {JSON.stringify(modal)}
        </div>
      </div>
    }
    return null
  }
}
