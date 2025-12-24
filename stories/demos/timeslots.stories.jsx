import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
import Timeslots from './exampleCode/timeslots'

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

export function Example7() {
  return <Timeslots localizer={localizer} />
}
Example7.storyName = 'Timeslots'
