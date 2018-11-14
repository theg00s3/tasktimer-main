import React, {Component} from 'react'
import './Modal.styl'

export default class Modal extends Component {
  render () {
    const {modal} = this.props

    console.log('modal', modal)
    if (!modal || !modal.show) return null

    return <div>
      {JSON.stringify(modal)}
    </div>
  }
}
