import React, {Component} from 'react'

export default class LoadingWave extends Component {
  render () {
    return <div style='height: 200px; width: 100%;'>
      <svg style='height: 100%; width: 100%;' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' preserveAspectRatio='none'>
        <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.6'
          d=' M-32 4 C-24 4 -24 28 -16 28 C-8 28 -8 4 0 4 C8 4 8 28 16 28 C24 28 24 8 32 8 '>
          <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
            dur='10s' repeatCount='indefinite' />
        </path>
        <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.4'
          d=' M-32 12 C-24 12 -24 20 -16 20 C-8 20 -8 12 0 12 C8 12 8 20 16 20 C24 20 24 12 32 12 '>
          <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
            dur='10s' repeatCount='indefinite' />
        </path>
        <path fill='none' stroke='#0f9' stroke-width='.5' opacity='.8'
          d=' M-32 8 C-24 8 -24 24 -16 24 C-8 24 -8 8 0 8 C8 8 8 24 16 24 C24 24 24 8 32 8 '>
          <animateTransform attributeName='transform' type='translate' values=' 0 0; 32 0 '
            dur='10s' repeatCount='indefinite' />
        </path>
      </svg>
    </div>
  }
}
