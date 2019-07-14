import React from 'react'

import { storiesOf } from '@storybook/react'

import Signup from '../src/components/Signup'

storiesOf('Signup', module)
  .add('standard', () => <Signup user={null} subscription={{}} actions={null} />)
