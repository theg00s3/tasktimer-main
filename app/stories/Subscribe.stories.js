import React from 'react'

import { storiesOf } from '@storybook/react'

import Subscribe from '../src/components/Subscribe'

storiesOf('Subscribe', module)
  .add('standard', () => <Subscribe user={null} subscription={{}} actions={null} />)
