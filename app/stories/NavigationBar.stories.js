import React from 'react'

import { storiesOf } from '@storybook/react'

import NavigationBar from '../src/components/NavigationBar'

storiesOf('NavigationBar', module)
  .add('standard', () => <NavigationBar loading={{loadingUser: false}} />)
