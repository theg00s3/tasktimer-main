import React, {Component} from 'react'
import './Modal.styl'

export default class Modal extends Component {
  render () {
    const {modal} = this.props

    if (!modal.show) return null

    return <div>
      {JSON.stringify(modal)}
    </div>
  }
}
