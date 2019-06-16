import React from 'react'

import { storiesOf } from '@storybook/react'

import Timer from '../src/components/Timer'

storiesOf('Timer', module)
  .add('standard', () => <Timer timer={'00:00'} />)
