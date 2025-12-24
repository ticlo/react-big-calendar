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

const localizer = luxonLocalizer(DateTime)

export function Example5() {
  return <CultureDemo localizer={localizer} />
}
Example5.storyName = 'Localization'
