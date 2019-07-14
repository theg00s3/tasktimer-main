import React from 'react'

import { storiesOf } from '@storybook/react'

import SignupNow from '../src/components/SignupNow'

storiesOf('SignupNow', module)
  .add('standard', () => <SignupNow user={null} subscription={{}} actions={null} />)
