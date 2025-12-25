import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import CultureDemo from './exampleCode/cultures'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

export function Example5() {
  return <CultureDemo />
}
Example5.storyName = 'Localization'
