import React from 'react'

import { storiesOf } from '@storybook/react'

import Todo from '../src/components/Todo'

storiesOf('Todo', module)
  .add('standard', () => <Todo completable deletable editable todo={{ completed: true, text: 'write some tests', id: 18, completedAt: new Date('2019-06-01T16:56:05.726Z'), 'userId': '5a9fe4e085d766000c002636' }} />)
