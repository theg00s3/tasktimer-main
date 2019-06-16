import React from 'react'

import { storiesOf } from '@storybook/react'

import SubscribeNow from '../src/components/SubscribeNow'

storiesOf('SubscribeNow', module)
  .add('standard', () => <SubscribeNow user={null} subscription={{}} actions={null} />)
