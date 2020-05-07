import React, { Component } from 'react'
import './Signup.styl'

export default class Signup extends Component {
  render () {
    return <div className='content tac'>
      <div className='signup'>
        Signup to &nbsp;

        <span>Task Timer <span className='pro-badge'>Pro</span></span>

        <div className='price-choices'>
          <div className='price'>
            <span className='price-symbol'>€</span>
            <span className='price-amount'>1</span>
            <span className='price-frequency'>/mo</span>
          </div>
        </div>
      </div>
    </div>
  }
}
