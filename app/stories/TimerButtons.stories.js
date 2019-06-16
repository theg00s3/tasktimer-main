import React from 'react'

import { storiesOf } from '@storybook/react'

import TimerButtons from '../src/components/TimerButtons'

storiesOf('TimerButtons', module)
  .add('standard', () => <TimerButtons />)
